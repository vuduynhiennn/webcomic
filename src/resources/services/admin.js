const { kMaxLength } = require("buffer");

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
<<<<<<< HEAD
            res.redirect('/admin/commic')
        })
    },
    
    addcomic: (req, res) => { 
        const avt = req.file.filename
        console.log(avt)
        const { name, author,tag} = req.body
        console.log(name +"||"+author)


            // check name
        if (!name){
            return res.render("admin_commic", { message: "thiếu tên r"})
        }
            // check password and confirm password is not the same
        if (!avt) {
            return res.render("admin_commic", { message: "Thiếu ảnh r đcmm"})
        }
            // create connection to mysql
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
             // connected to mysql successfully
        const sql = `INSERT INTO comics VALUES (NULL, '${name}', '${author}', '${avt}','${tag}', NULL, 0);`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            conToDb.end() 
            return res.send(`Truyện:${name} ____ đã được hêm`)
        })
            
    },
    addfolderchapter: (req, res) => { 
        
        const fs = require("fs")
        const path = require("path")
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
             // connected to mysql successfully
        const sql = `SELECT * FROM chapters WHERE id=(SELECT max(id) FROM chapters) `
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            const id = result[0].id +1
            const idname = id +""
            fs.mkdir(path.join("./src/public/image/chapter",idname),{},err=>{
                if(err) throw err
                conToDb.end() 
                return res.send(`Chap mới đã được thêm`)
            })
           
        })
    },
    addchapter:(req, res,next) => { 
        const {comic, name,number} = req.body

            // create connection to mysql
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
             // connected to mysql successfully
        const sql = `INSERT INTO chapters VALUES (NULL, '${comic}','', '${name}', NULL,${number});`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            conToDb.end()
            next()
        })
    }
    
=======
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
>>>>>>> d24d298 (I dont know)
}

module.exports = adminServices