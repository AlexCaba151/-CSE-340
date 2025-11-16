const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function (req, res, next) {
  try {
    const nav = await utilities.getNav()

    res.render("index", {
      title: "Home",
      nav, cssFile: "/css/home.css"
    })

  } catch (err) {
    next(err)
  }
}


module.exports = baseController
