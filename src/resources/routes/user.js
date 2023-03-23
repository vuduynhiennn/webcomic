require("dotenv").config()
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const userServices = require("../services/user")

const userRoutes = (app) => {
  // routes for render views
  app.get('/', (req, res) => {
    const cookies = req.headers.cookie 
    return res.render('home', { cookies: cookies })
  })

  router.get("/login", (req, res) => { res.render("login") } )
  router.get("/register", (req, res) => { res.render("register") })
  router.get("/authEmail", (req, res) => res.render("authEmail"))
  router.get("/forgetPassword", (req, res) => res.render("forgetPass"))
  router.get("/user", authMiddleware, (req, res) => res.render("User_Detail", {cookies: true}))
  router.get("/account", (req, res) => res.render("Account_Detail",  { cookies: true }))
  router.get("/followcomic", authMiddleware,  (req, res) => res.render("followcomic_Detail", { cookies: true }))
  router.get("/changepassword", authMiddleware, (req, res) => res.render("changepassword", { cookies: true}))
  router.get("/logout", (req, res) => {
      res.clearCookie("credential")
      res.redirect('/')
  })

// routing  
  router.post("/change_password", authMiddleware, userServices.change_password)
  router.post("/updateUserInforbasic", authMiddleware, userServices.updateUserInforbasic)
  // for change email
  router.post("/updateUserinforemail", authMiddleware, userServices.updateUserinforemail)
  router.post("/updateUserinforCode", authMiddleware, userServices.updateUserinforCode)
  router.post("/verify_email", authMiddleware ,userServices.verify_email)
  router.post("/verify_email_code", authMiddleware ,userServices.verify_email_code)
  router.post("/register", userServices.register)
  router.post("/login", userServices.login)
  router.post("/forgetPassword", userServices.forgetPassword)
  router.post("/forgetPassword/code", userServices.forgetPasswordCode)
  return app.use("/", router)
}
module.exports = userRoutes

