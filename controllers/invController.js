const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* List vehicles by classification */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = parseInt(req.params.classificationId)

    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()

    const className = data.length > 0 ? data[0].classification_name : "No Vehicles Found"

    res.render("inventory/classification", {
      title: `${className} vehicles`,
      nav,
      grid, cssFile: "/css/inventory.css"
    })
  } catch (error) {
    next(error)
  }
}

/* NEW: Vehicle detail page */
invCont.buildDetail = async function (req, res, next) {
  try {
    const invId = parseInt(req.params.invId)

    const vehicle = await invModel.getVehicleById(invId)
    if (!vehicle) {
      return next(Object.assign(new Error("Vehicle not found"), { status: 404 }))
    }

    const nav = await utilities.getNav()
    const detailHtml = await utilities.buildDetailView(vehicle)

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      detail: detailHtml, cssFile: "/css/detail.css"
    })

  } catch (error) {
    next(error)
  }
}

module.exports = invCont
