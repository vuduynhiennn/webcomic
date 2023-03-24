const adminServices = require("../services/admin")

const adminController = {
    login: adminServices.login,
    addcomic: adminServices.addcomic,
    addchapter: adminServices.addchapter,
    addfolder: adminServices.addfolderchapter
}

module.exports = adminController