require("dotenv").config()
const express = require("express");
const userAuth = require("../middlewares/userAuth");
const checkauth = require("../middlewares/checkauth");
const router = express.Router();

const comics = require("../services/comics")
const user = require("../services/user")

const commicsRoutes = (app) => {
  // routes for render views
    router.get("/chapter/:id",checkauth,user.getexp, comics.chapter)

    router.post("/followcomic",userAuth,comics.followcomic)

    return app.use("/commic", router)
}
module.exports = commicsRoutes