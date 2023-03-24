const multer = require("multer")
const upload = multer({ dest: '../../public/image/user_avatars' })

const uploadUserImage = (req, res, next) => {
    upload.single('new_avatar')
    next()
}

module.exports = uploadUserImage