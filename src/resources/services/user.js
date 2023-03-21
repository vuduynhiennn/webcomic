const randomeCode = Math.floor(Math.random() * (9999 - 0)) + 0

const userServices = {
    register: (req, res) => {   
        const { username, password, confirmPassword } = req.body
        // check all fields are typed
        if (!password || !username || !confirmPassword) {
            return res.render("register", { message: "vui lòng nhập đầy đủ các trường"})
        }

        // check password and confirm password is not the same
        if (password !== confirmPassword) {
            return res.render("register", { message: "Các mật khẩu đã nhập không khớp. Hãy thử lại"})
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

        const sql = `SELECT * FROM users WHERE username="${username}"`
        conToDb.query(sql, (err, result) => {
            if (err) return console.log("line 22: ", err)
            // if result.length == 0, it means there isn't a record has value username in database
            if (result.length == 1) {
                return res.render("register", { message: `${username} đã tồn tại, vui lòng chọn một user khác`})
            }

            const sql = `INSERT INTO users (username, pass) VALUES ("${username}", "${password}")`
            conToDb.query(sql, (err, result) => {
                if (err) console.log(err)
                conToDb.end() 
                return res.render("register", { message: `${username} đã đăng kí thành công`})
            })
        })
    },
    verify_email: (req, res) => {
        const { email } = req.body;

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

        // query
        const sql = `SELECT * FROM users WHERE gmail="${email}"`
        conToDb.query(sql, (err, result) => {
            if (err) return res.json({err: err})
            if (result.length) { return res.json("Email này đã được đăng kí") }

            const emailServices = require("../../config/nodemailer")
            emailServices(email, `Thư xác nhận thêm email vào tài khoản`, `nhập mã sau để liên kết tài khoản với gmail <b> ${randomeCode} </b>`)
            conToDb.end()
            return res.json("ok ")
        })
    },
    verify_email_code: (req, res) => {
        const { code } = req.body
        if (!code) { return res.json("vui lòng nhập mã xác nhận") }
        if (code != randomeCode) { return res.json("mã xác nhận không đúng") }
        const sql = `INSERT INTO users VALUES ()`
        /// insert email to user record
        return res.json("ok")
    },
    login: async (req, res) => {
        const { username, password } = req.body

        if (!username || !password) {
            return res.render("login", { message: "vui lòng không để trống các trường" })
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
         })         // connected to mysql successfully

        const sql = `SELECT * FROM users WHERE username="${username}"`
        await conToDb.query(sql, async (err, result) => {
            if (err) console.log(err)
            if (!result.length) { return res.render("login", { message: `${username} chưa được đăng kí` }) }
            if (result[0].pass != password) { return res.render("login", { message: "mật khẩu không đúng" }) }
          
            // generate token
            const identifier = result[0].userid

            const usernames = result[0].username
            const gmail = result[0].gmail
            const avatar = result[0].avatar
            const jwt = require("jsonwebtoken")
            const token = await jwt.sign(identifier, process.env.SECRET)
            const credential = {
                token: token,
                username: usernames,
                gmail: gmail,
                avatar: avatar
            }

            res.cookie("credential", JSON.stringify(credential))
            
            return res.redirect("/")
        })
    },
    logout: (req, res) => {
        req.render("home", {cookies: false})
    },
    forgetPassword: (req, res) => {
        const { email } = req.body
        if (!email) {return res.render("forgetPass", { message: "Vui lòng nhập email vào"})}

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
        // query
        const sql = `SELECT * FROM users WHERE gmail="${email}"`
        conToDb.query(sql, (err, result) => {
            if (err) return res.json(err)
            if (!result.length) {return res.render("forgetPass", { message: `${email} chưa được đăng kí`})}

            const emailServices = require("../../config/nodemailer");
            emailServices(`${email}`, "Vui lòng nhập code để xác nhận thiết lập lại mật khẩu !" , `mã của bạn là ${randomeCode}`)
            res.render("forgetPass", { isCode: true, hideEmail: true} )
        })
    },
    forgetPasswordCode: (req, res) => {
        const {code } = req.body
        if (!code) {
            return res.render("forgetPass", {isCode: true, hideEmail: true, message : "vui lòng không để trống"})
        }
        if (code !=  randomeCode) {
            return res.render("forgetPass", {isCode: true, hideEmail: true, message : "mã xác nhận không chính xác"})
        }

        // developing

        return res.redirect("/")
    }
}

module.exports = userServices