const express = require("express")
const router = express.Router()

const adminAuth = require("../middlewares/adminAuth")

const adminController = require("../controllers/admin")

const adminRoutes = (app) => {
    // render views
    router.get("/login", (req, res) => res.render("admin-login"))
    router.get("/logout", (req, res) => {
        res.clearCookie("credential")
        res.redirect('/admin/login')
    })
    router.get("/commic", adminAuth, (req, res) => res.render("admin_commic", { isLoggedIn: true }))

    // services
    router.post("/login", adminController.login)

    // return routes
    return app.use("/admin", router)
}

module.exports = adminRoutes