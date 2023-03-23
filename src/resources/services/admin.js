const adminServices = {
    login: (req, res) => {
        const { admin_name, admin_password } = req.body
        if (!admin_name || !admin_password) { return res.render("../views/admin/admin-login.handlebars", { message: "Nhập đầy đủ thông tin mới đăng nhập được chứ"}) } 

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
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            if (!result.length) { return res.render("../views/admin/admin-login.handlebars", { message: `Không tìm thấy tài khoản ${admin_name}`}) }
            if (admin_password != result[0].admin_password) { return res.render("../views/admin/admin-login.handlebars", { message: "mật khẩu không đúng rồi"}) }

            return res.render("../views/admin/admin-comic.handlebars")
        })
    }
}

module.exports = adminServices