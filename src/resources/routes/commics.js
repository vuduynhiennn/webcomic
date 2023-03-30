require("dotenv").config()
const express = require("express");
const userAuth = require("../middlewares/userAuth");
const checkauth = require("../middlewares/checkauth");
const comicServices = require("../services/comics")
const router = express.Router();

const comics = require("../services/comics")
const user = require("../services/user")

const commicsRoutes = (app) => {
  // routes for render views
    router.get("/:id",checkauth, comicServices.showcomic)
    router.get("/chapter/:id",checkauth,user.getexp, comics.chapter)

    router.post("/followcomic",userAuth,comics.followcomic)
    router.post("/unfollowcomic",userAuth,comics.unfollowcomic)
    router.post("/comment",userAuth,comics.comment)

    return app.use("/commic", router)
}
module.exports = commicsRoutes