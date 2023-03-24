const adminServices = require("../services/admin")

const adminController = {
    // for authorization
    login: adminServices.login,

    // for privilege
    add_comic: adminServices.add_comic,
    add_tags: adminServices.add_tags

}

module.exports = adminController