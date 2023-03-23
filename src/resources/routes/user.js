require("dotenv").config()
const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuth");
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
  router.get("/user", userAuth, (req, res) => res.render("User_Detail", {cookies: true}))
  router.get("/account", (req, res) => res.render("Account_Detail",  { cookies: true }))
  router.get("/followcomic", userAuth,  (req, res) => res.render("followcomic_Detail", { cookies: true }))
  router.get("/changepassword", userAuth, (req, res) => res.render("changepassword", { cookies: true}))
  router.get("/logout", (req, res) => {
      res.clearCookie("credential")
      res.redirect('/')
  })

// routing  
  router.post("/change_password", userAuth, userServices.change_password)
  router.post("/updateUserInforbasic", userAuth, userServices.updateUserInforbasic)
  // for change email
  router.post("/updateUserinforemail", userAuth, userServices.updateUserinforemail)
  router.post("/updateUserinforCode", userAuth, userServices.updateUserinforCode)
  router.post("/verify_email", userAuth ,userServices.verify_email)
  router.post("/verify_email_code", userAuth ,userServices.verify_email_code)
  router.post("/register", userServices.register)
  router.post("/login", userServices.login)
  router.post("/forgetPassword", userServices.forgetPassword)
  router.post("/forgetPassword/code", userServices.forgetPasswordCode)
  return app.use("/", router)
}
module.exports = userRoutes

