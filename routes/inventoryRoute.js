const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

router.get("/type/:classificationId", invController.buildByClassificationId)

// NEW route for vehicle detail
router.get("/detail/:invId", invController.buildDetail)

module.exports = router
