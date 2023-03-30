
const multer = require("multer")

const comicstorage = multer.diskStorage({
    destination:(req,file,res)=>{
        res(null,'./src/public/image/comic')
    },
    filename:(req,file,res)=>{
        res(null,file.originalname)
    }
})
const comicupload =multer({storage:comicstorage})

module.exports = comicupload