// utilities/inventory-validation.js
const { body, validationResult } = require("express-validator")
const utilities = require("./")

const invValidate = {}

/* ==========================================
   REGLAS: ADD CLASSIFICATION
   ========================================== */
invValidate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .notEmpty()
      .withMessage("Classification name is required.")
      .matches(/^[A-Za-z0-9]+$/)
      .withMessage("Classification name must not contain spaces or special characters."),
  ]
}

/* ==========================================
   MIDDLEWARE: CHECK ADD CLASSIFICATION
   ========================================== */
invValidate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const nav = await utilities.getNav()
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: errors.array(),
      notice: null,
      classification_name,
    })
  }
  next()
}

/* ==========================================
   REGLAS: ADD INVENTORY
   ========================================== */
invValidate.inventoryRules = () => {
  return [
    body("classification_id").trim().notEmpty().withMessage("Choose a classification."),
    body("inv_make").trim().notEmpty().withMessage("Make is required."),
    body("inv_model").trim().notEmpty().withMessage("Model is required."),
    body("inv_description").trim().notEmpty().withMessage("Description is required."),
    body("inv_image").trim().notEmpty().withMessage("Image path is required."),
    body("inv_thumbnail").trim().notEmpty().withMessage("Thumbnail path is required."),
    body("inv_price").trim().isFloat({ min: 0 }).withMessage("Price must be a positive number."),
    body("inv_year").trim().isInt({ min: 1900, max: 9999 }).withMessage("Year must be 4 digits."),
    body("inv_miles").trim().isInt({ min: 0 }).withMessage("Miles must be numbers only."),
    body("inv_color").trim().notEmpty().withMessage("Color is required."),
  ]
}

/* ==========================================
   MIDDLEWARE: CHECK ADD INVENTORY
   ========================================== */
invValidate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
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

  if (!errors.isEmpty()) {
    const nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList(
      classification_id
    )

    return res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      errors: errors.array(),
      notice: null,
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
  next()
}

module.exports = invValidate
