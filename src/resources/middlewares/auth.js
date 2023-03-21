require("dotenv").config()
const jwt = require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
   if (req.headers.cookie) {
      const token = req.headers.cookie.token
      if (!token) {
         if (!req.headers.cookie) return res.redirect("/login") 
         const tokenFromClient = decodeURIComponent(req.headers.cookie)
         const parseToken = JSON.parse(tokenFromClient.split("=")[1]).token
         
         jwt.verify(parseToken, process.env.SECRET, (err, decoded) => {
            if (err) console.log(err)
            req.body.currentId = decoded
            next()   
         })
   
      } else {
         jwt.verify(JSON.parse(decodeURIComponent(token)), process.env.SECRET, (err, decoded) => {
            if (err) console.log(err)
            next()   
         })
      }
   } else {
      return res.redirect("/login")
   }

   
}

module.exports = authMiddleware