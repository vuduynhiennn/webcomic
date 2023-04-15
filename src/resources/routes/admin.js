const express = require("express")
const router = express.Router()

const multer = require("multer")

const comicstorage = multer.diskStorage({
    destination:(req,file,res)=>{
        res(null,'./src/public/image/comic')
    },
    filename:(req,file,res)=>{
        res(null,file.originalname)
    }
})
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
const comicupload =multer({storage:comicstorage})


//////////////////////////////////////////////////
const adminAuth = require("../middlewares/adminAuth")
const comics = require("../services/comics")
const adminController = require("../controllers/admin")
const path = require("path")



const adminRoutes = (app) => {
    // render views
    router.get("/login", (req, res) => res.render("admin-login"))
    router.get("/logout", (req, res) => {
        res.clearCookie("credential") // delete cookies credential
        res.redirect('/admin/login')
    })
<<<<<<< HEAD
    router.get("/commic", adminAuth, comics.admincomic)
    router.get("/chapter/:id", (req, res) => {
        res.render("admin_chapter", { isLoggedIn: true ,comic:req.params.id})
    })
    // services
    router.post("/login", adminController.login)

    //add comic
    router.post("/addnewcomic",comicupload.single("image"),adminController.addcomic)
    router.post("/addnewchapter",chapterupload.array("image"),adminController.addchapter,adminController.addfolder)
   
    
=======
    router.get("/commic", adminAuth, (req, res) => res.render("admin_comic", { isLoggedIn: true }))

    // admin authorization services
    router.post("/login", adminController.login)

    router.post("/add_comic", adminAuth, adminController.add_comic)
    router.post("/add_tags", adminAuth, adminController.add_tags)



>>>>>>> d24d298 (I dont know)
    // return routes
    return app.use("/admin", router)
}

module.exports = adminRoutes