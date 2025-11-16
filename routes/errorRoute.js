const express = require("express")
const router = express.Router()
const errorController = require("../controllers/errorController")

// Route intentionally causing a 500 error
router.get("/trigger", errorController.throwError)

module.exports = router
