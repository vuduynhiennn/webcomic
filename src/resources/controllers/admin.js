const adminServices = require("../services/admin")

const adminController = {
<<<<<<< HEAD
    login: adminServices.login,
    addcomic: adminServices.addcomic,
    addchapter: adminServices.addchapter,
    addfolder: adminServices.addfolderchapter
=======
    // for authorization
    login: adminServices.login,

    // for privilege
    add_comic: adminServices.add_comic,
    add_tags: adminServices.add_tags

>>>>>>> d24d298 (I dont know)
}

module.exports = adminController