require("dotenv").config()
const express = require("express");
const router = express.Router();


const commicsRoutes = (app) => {
  // routes for render views
    router.get("/all", (req, res) => {
        res.render("login")
    })
    
    return app.use("/comics", router)
}
module.exports = commicsRoutes