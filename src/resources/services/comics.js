const comic = {
    allcomic: (req, res) => {
        if(!req.headers.cookie){
            const cookies = req.headers.cookie 
            console.log(req.body)
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

                const sqltopcomic =`SELECT * FROM comics ORDER BY views DESC LIMIT 10`
                conToDb.query(sqltopcomic, (err, resulttopcomic) => {
                    if (err) console.log(err)

                    const sqltopuser =`SELECT * FROM users ORDER BY Point DESC LIMIT 10`
                    conToDb.query(sqltopuser, (err, resulttopuser) => {
                        conToDb.end() 
                        console.log(resulttopuser)
                        return res.render('home', { cookies: cookies,comics:result,followcomic:false,topcomic:resulttopcomic})
                
                    })
                })
            })
        }else{
        const cookies = req.headers.cookie 
        const{currentId} = req.body
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
        const sqlcomic = `SELECT * FROM comics ;`
        conToDb.query(sqlcomic, (err, resultcomic) => {
            if (err) console.log(err)
            const sqlfollow = `SELECT * from userfollowingcomics INNER JOIN comics ON userfollowingcomics.comicid = comics.id WHERE userid=${currentId}`
            conToDb.query(sqlfollow , (err, resultfollow) => {
               if (err) console.log(err)

               const sqltopcomic =`SELECT * FROM comics ORDER BY views DESC LIMIT 10`
                conToDb.query(sqltopcomic, (err, resulttopcomic) => {
                    if (err) console.log(err)

                    const sqltopuser =`SELECT * FROM users ORDER BY Point DESC LIMIT 10`
                    conToDb.query(sqltopuser, (err, resulttopuser) => {
                        if (err) console.log(err)

                        const sqlhistory =`SELECT * from history INNER JOIN comics ON history.comicid = comics.id INNER JOIN chapters ON history.chapterid = chapters.id WHERE history.userid =1 ORDER BY history.idhistory DESC;`
                        conToDb.query(sqlhistory, (err, resulthistory) => {
                            if (err) console.log(err)
                            conToDb.end() 

                            return res.render('home', { cookies: cookies,comics: resultcomic,followcomic:resultfollow,topcomic:resulttopcomic,topuser:resulttopuser,history:resulthistory})
                        })
                    })
                   
                })
            })
           
            
        })
        }
    },
    showhome: (req,res) =>{
        const cookies = req.headers.cookie 
        console.log(showw)
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
        const sqlcomic = `SELECT * FROM comics ;`
        conToDb.query(sqlcomic, (err, resultcomic) => {
            if (err) console.log(err)
            const sqlfollow = `SELECT * from userfollowingcomics INNER JOIN comics ON userfollowingcomics.comicid = comics.id WHERE userid=${currentId}`
            conToDb.query(sqlfollow , (err, resultfollow) => {
               if (err) console.log(err)
               conToDb.end()
               co.log(resultfollow)
               return res.render('home', { cookies: cookies,comics: resultcomic,followcomic:resultfollow})
            })
           
            
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

    chapter:(req, res) => {//nay la show chap
        const userid = req.body.currentId
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
        const sql = `SELECT * FROM chapters where id=${req.params.id};`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            const idcomic = result[0].comicid
            const sqlview =`UPDATE comics SET views = views + 1 WHERE id=${idcomic}`
            conToDb.query(sqlview, (err, views) => {
                if (err) console.log(err)

                if(userid){
                    const sqldelete =`DELETE FROM history WHERE comicid=${idcomic} and userid=${userid}`
                    conToDb.query(sqldelete, (err, deletec) => {
                        if (err) res.render("chapter",{ cookies: true ,chapter:req.params.id,numberimg:result[0].imagenumber})
                        const sqlhistory =`INSERT INTO history (idhistory,userid, comicid, chapterid) VALUES (NULL,${userid}, ${idcomic}, ${req.params.id})`
                        conToDb.query(sqlhistory, (err, read) => {
                            if (err) res.render("chapter",{ cookies: true ,chapter:req.params.id,numberimg:result[0].imagenumber})

                            conToDb.end() 
                            res.render("chapter",{ cookies: true ,chapter:req.params.id,numberimg:result[0].imagenumber})
                        })
                    })

                }else{
                    conToDb.end() 
                    res.render("chapter",{ cookies: true ,chapter:req.params.id,numberimg:result[0].imagenumber})
                }
            })
        })
    },
    followcomic:(req, res) => {
        const {comicid, currentId} = req.body
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
        const sql = `INSERT INTO userfollowingcomics VALUES (${currentId},${comicid});`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            conToDb.end() 
            return res.redirect(`/commic/${comicid}`)
        })
    },
    showfollowcomic: (req,res) =>{
        const{currentId}=req.body
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
        // connected
        // query
       const sql = `SELECT * from userfollowingcomics INNER JOIN comics ON userfollowingcomics.comicid = comics.id WHERE userid=${currentId}`
        conToDb.query(sql , (err, result) => {
           if (err) console.log(err)
           conToDb.end()
           console.log(result)
           res.render("followcomic_Detail",{listfollow:result})
        })
    }
}

module.exports = comic