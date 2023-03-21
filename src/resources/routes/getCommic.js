require("dotenv").config()
const express = require("express");
const router = express.Router();

const userServices = require("../services/user")

const authMiddleware = require("../middlewares/auth");

const getCommics = (app) => {
  // routes for render views
    router.get("/login", (req, res) => {
        res.render("login")
    })

    return app.use("/", router)
}
module.exports = authRoutes