const comic = {
    allcomic: (req, res) => {
        const cookies = req.headers.cookie 
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
        const sql = `SELECT * FROM comics;`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            conToDb.end() 
            return res.render('home', { cookies: cookies,comics:result})
        })
    },
    showcomic: (req, res) => {
        const cookies = req.headers.cookie 
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
        const sql = `SELECT * FROM comics where id =${req.params.id};`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            const sqlchapter = `SELECT * FROM chapters where comicid =${req.params.id} ORDER BY id DESC;`
            conToDb.query(sqlchapter, (err, resultchap) => {
                if (err) console.log(err)
                conToDb.end() 
                return res.render('comic', { cookies: cookies,comics: result[0],chapters: resultchap})
            })
        })
    },
    admincomic: (req, res) => {
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
        const sql = `SELECT * FROM comics;`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            conToDb.end() 
            return res.render("admin_commic", { isLoggedIn: true,comics:result})
        })
    },
}

module.exports = comic