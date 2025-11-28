const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

// Este ES el objeto controlador
const invController = {}

/* ===============================
   LIST BY CLASSIFICATION
=================================*/
invController.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = parseInt(req.params.classificationId)

    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()

    const className =
      data.length > 0 ? data[0].classification_name : "No Vehicles Found"

    res.render("inventory/classification", {
      title: `${className} vehicles`,
      nav,
      grid,
      cssFile: "/css/inventory.css",
    })
  } catch (error) {
    next(error)
  }
}

/* ===============================
   VEHICLE DETAIL
=================================*/
invController.buildDetail = async function (req, res, next) {
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
      detail: detailHtml,
      cssFile: "/css/detail.css",
    })
  } catch (error) {
    next(error)
  }
}

/* ===============================
   MANAGEMENT VIEW
=================================*/
invController.buildManagementView = async function (req, res, next) {
  try {
    const nav = await utilities.getNav()
    const notice = req.flash("notice")

    res.render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
      notice,
    })
  } catch (error) {
    next(error)
  }
}

/* ===============================
   ADD CLASSIFICATION (GET)
=================================*/
invController.buildAddClassification = async function (req, res, next) {
  try {
    const nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
      notice: null,
      classification_name: "",
    })
  } catch (error) {
    next(error)
  }
}

/* ===============================
   ADD CLASSIFICATION (POST)
=================================*/
invController.addClassification = async function (req, res, next) {
  const { classification_name } = req.body

  try {
    const result = await invModel.addClassification(classification_name)

    if (result) {
      const nav = await utilities.getNav()
      req.flash("notice", "Classification added successfully.")
      const notice = req.flash("notice")

      return res.status(201).render("inventory/management", {
        title: "Vehicle Management",
        nav,
        errors: null,
        notice,
      })
    } else {
      const nav = await utilities.getNav()
      req.flash("notice", "Sorry, the classification could not be added.")
      const notice = req.flash("notice")

      return res.status(500).render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null,
        notice,
        classification_name,
      })
    }
  } catch (error) {
    next(error)
  }
}

/* ===============================
   ADD INVENTORY (GET)
=================================*/
invController.buildAddInventory = async function (req, res, next) {
  try {
    const nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList()

    res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      errors: null,
      notice: null,
      classificationSelect,
      inv_make: "",
      inv_model: "",
      inv_description: "",
      inv_image: "/images/vehicles/no-image.png",
      inv_thumbnail: "/images/vehicles/no-image-tn.png",
      inv_price: "",
      inv_year: "",
      inv_miles: "",
      inv_color: "",
    })
  } catch (error) {
    next(error)
  }
}

/* ===============================
   ADD INVENTORY (POST)
=================================*/
invController.addInventory = async function (req, res, next) {
  const {
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body

  try {
    const result = await invModel.addInventory({
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
    })

    if (result) {
      const nav = await utilities.getNav()
      req.flash("notice", "Vehicle added successfully.")
      const notice = req.flash("notice")

      return res.status(201).render("inventory/management", {
        title: "Vehicle Management",
        nav,
        errors: null,
        notice,
      })
    } else {
      const nav = await utilities.getNav()
      const classificationSelect =
        await utilities.buildClassificationList(classification_id)

      req.flash("notice", "Sorry, the vehicle could not be added.")
      const notice = req.flash("notice")

      return res.status(500).render("inventory/add-inventory", {
        title: "Add Vehicle",
        nav,
        errors: null,
        notice,
        classificationSelect,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = invController
