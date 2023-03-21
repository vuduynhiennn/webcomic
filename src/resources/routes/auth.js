require("dotenv").config()
const express = require("express");
const router = express.Router();

const userServices = require("../services/user")

const authMiddleware = require("../middlewares/auth");

const authRoutes = (app) => {
  // routes for render views
    router.get("/login", (req, res) => {
        res.render("login")
    })
    router.get("/register", (req, res) => {
        res.render("register")
    })
    router.get("/forgetPassword", (req, res) => res.render("forgetPass"))
    router.get("/user", (req, res) => res.render("User_Detail"))
    router.get("/account", (req, res) => res.render("Account_Detail"))
    router.get("/followcomic", (req, res) => res.render("followcomic_detail"))
    router.get("/changepassword", (req, res) => res.render("changepassword"))


    router.get("/logout", (req, res) => {
        res.render("home", { cookies: false })
    })
  // routing  
    router.post("/verify_email", authMiddleware ,userServices.verify_email)
    router.post("/verify_email_code", authMiddleware ,userServices.verify_email_code)

    router.post("/register", userServices.register)
    router.post("/login", userServices.login)

    router.post("/forgetPassword", userServices.forgetPassword)
    router.post("/forgetPassword/code", userServices.forgetPasswordCode)
    return app.use("/", router)
}
module.exports = authRoutes

