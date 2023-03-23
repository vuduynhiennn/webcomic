require("dotenv").config();
const PORT = process.env.PORT || 5000
const express = require('express')
const app = express()

// config
const config = require("./config/config")
config(app)

// routes
const userRoutes = require("./resources/routes/user")
userRoutes(app)

const adminRoutes = require("./resources/routes/admin")
adminRoutes(app)

const commicsRoutes = require("./resources/routes/commics")
commicsRoutes(app)


app.listen(PORT, () => console.log(`server is running on port http://localhost:${PORT}`))
