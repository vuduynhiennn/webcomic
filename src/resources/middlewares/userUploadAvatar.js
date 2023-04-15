const multer  = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/image/user_avatars')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    } 
})
const upload = multer({ storage: fileStorageEngine })

const userUploadAvatar = (req, res, next) => {
    console.log("upload middleware")
    upload.single("avatar")
    next()
}

module.exports = userUploadAvatar