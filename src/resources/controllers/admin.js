const adminServices = require("../services/admin")

const adminController = {
    login: adminServices.login
}

module.exports = adminController