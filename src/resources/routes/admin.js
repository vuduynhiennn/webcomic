const express = require("express")
const router = express.Router()
const comicupload = require("../middlewares/upload/Admin_comic")
const chapterupload = require("../middlewares/upload/Admin_chapter")
const adminAuth = require("../middlewares/adminAuth")
const comics = require("../services/comics")
const adminController = require("../controllers/admin")
const path = require("path")



const adminRoutes = (app) => {
    // render views
    router.get("/login", (req, res) => res.render("admin-login"))
    router.get("/logout", (req, res) => {
        res.clearCookie("credential")
        res.redirect('/admin/login')
    })
    router.get("/commic", adminAuth, comics.admincomic)
    router.get("/chapter/:id", (req, res) => {
        res.render("admin_chapter", { isLoggedIn: true ,comic:req.params.id})
    })
    // services
    router.post("/login", adminController.login)

    //add comic/chapter
    router.post("/addnewcomic",comicupload.single("image"),adminController.addcomic)
    router.post("/addnewchapter",chapterupload.array("image"),adminController.addchapter,adminController.addfolder)
   
    
    // return routes
    return app.use("/admin", router)
}

module.exports = adminRoutes