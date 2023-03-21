require("dotenv").config()
const jwt = require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
   const tokenFromClient = req.cookies['token']
   jwt.verify(tokenFromClient, process.env.SECRET, (err, decoded) => {
      if (err) console.log(err)
      next()   
   })
   return res.redirect("/login")
}

module.exports = authMiddleware