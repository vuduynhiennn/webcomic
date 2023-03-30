const multer = require("multer")
const chapterstorage = multer.diskStorage({
    destination:(req,file,res)=>{
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
            conToDb.end()
            
            if(!result[0]){
                res(null,'./src/public/image/chapter/1')
            }else{
                let id = result[0].id+1
                console.log("hello :"+id)
                const idname ='./src/public/image/chapter/'+ id
                console.log(idname)
                res(null,idname)
                
            }
        })
    },
    filename:(req,file,res)=>{
        res(null,file.originalname)
    }
})

const chapterupload = multer({storage:chapterstorage})

module.exports = chapterupload