const adminServices = {
    login: async (req, res) => {
        const { admin_name, admin_password } = req.body
        if (!admin_name || !admin_password) { return res.render("admin-login", { message: "Nhập đầy đủ thông tin mới đăng nhập được chứ"}) } 

        // create connection 
        const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
        const mysql = require("mysql");
        const conToDb = mysql.createConnection({
        host: HOST || "localhost",
        user: USER || "sa",
        password: PASSWORD || "123123",
        database: DATABASE || "QUANLYNHANSU"
        })
        conToDb.connect((err) => {
        if (err) throw err;
        console.log("Connected to mysql")
        })
        // connected to mysql
        const sql = `SELECT * FROM admin WHERE admin_name="${admin_name}"`;
        await conToDb.query(sql, async (err, result) => {
            if (err) console.log(err)
            if (!result.length) { return res.render("admin-login", { message: `Không tìm thấy tài khoản ${admin_name}`}) }
            if (admin_password != result[0].admin_password) { return res.render("admin-login", { message: "mật khẩu không đúng rồi"}) }

            const jwt = require("jsonwebtoken")
            const token = await jwt.sign(admin_name, process.env.SECRET)

            const admin_credential = {
                admin_name,
                token: token
            }    

            const adminStatus = require("../sessions/adminStatus")
            // update admin status - admin_name
            adminStatus.admin_name = admin_name
            res.cookie("credential", JSON.stringify(admin_credential))
            return res.render("admin_comic", { isLoggedIn: true })
        })
    },
    add_comic: (req, res) => {
        console.log("adding...")
    },
    add_tags: (req, res) => {
        const { tag_names } = req.body
        if (!tag_names) { console.log("không thấy tags name"); return }       
    }   
}

module.exports = adminServices