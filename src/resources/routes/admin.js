const express = require("express")
const router = express.Router()

const adminAuth = require("../middlewares/adminAuth")

const adminController = require("../controllers/admin")

const adminRoutes = (app) => {
    // render views
    router.get("/login", (req, res) => res.render("admin-login"))
    router.get("/logout", (req, res) => {
        res.clearCookie("credential") // delete cookies credential
        res.redirect('/admin/login')
    })
    router.get("/commic", adminAuth, (req, res) => res.render("admin_comic", { isLoggedIn: true }))

    // admin authorization services
    router.post("/login", adminController.login)

    router.post("/add_comic", adminAuth, adminController.add_comic)
    router.post("/add_tags", adminAuth, adminController.add_tags)



    // return routes
    return app.use("/admin", router)
}

module.exports = adminRoutes