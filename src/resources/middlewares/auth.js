require("dotenv").config()
const jwt = require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
   const token = JSON.parse(decodeURIComponent(req.headers.cookie)).token
   if (!token) {
      if (!req.headers.cookie) return res.redirect("/login") 
      const tokenFromClient = decodeURIComponent(req.headers.cookie)
      const parseToken = JSON.parse(tokenFromClient.split("=")[1]).token
      
      jwt.verify(parseToken, process.env.SECRET, (err, decoded) => {
         if (err) console.log(err)

         next()   
      })
   } else {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
         if (err) console.log(err)

         next()   
      })
   }
}

module.exports = authMiddleware