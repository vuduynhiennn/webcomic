require("dotenv").config()
const express = require("express");
const router = express.Router();

const comics = require("../services/comics")

const commicsRoutes = (app) => {
  // routes for render views
    router.get("/chapter/:id",comics.chapter)


    return app.use("/commic", router)
}
module.exports = commicsRoutes