const express = require("express")
const router = express.Router()

const adminController = require("../controllers/admin")

const adminRoutes = (app) => {
    // render views
    router.get("/login", (req, res) => res.render("admin-login"))
    router.get("/commic", (req, res) => res.render("admin-comic"))

    // services
    router.post("/login", adminController.login)
    return app.use("/admin", router)
}

module.exports = adminRoutes