require("dotenv").config();
const PORT = process.env.PORT || 5000

const express = require('express')
const app = express()

// config
const config = require("./config/config")
config(app)

// routes

app.get('/', (req, res) => {
    const cookies = req.headers.cookie // luu tru toan bo thong tin cookie
    return res.render('home', { cookies: cookies })
} )

const authRoutes = require("./resources/routes/auth")
authRoutes(app)

app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`))
// asdasdasdas
