const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const invValidate = require("../utilities/inventoryValidation");
router.get("/type/:classificationId", invController.buildByClassificationId)

// NEW route for vehicle detail
router.get("/detail/:invId", invController.buildDetail)


/* 
  RUTA: /inv
  Vista de gestión del inventario (management)
*/
router.get("/", invController.buildManagementView);

/*
  RUTA: /inv/add-classification
  GET: mostrar formulario
  POST: procesar formulario (validación + inserción)
*/
router.get("/add-classification", invController.buildAddClassification);

router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  invController.addClassification
);

/*
  RUTA: /inv/add-inventory
  GET: mostrar formulario
  POST: procesar formulario (validación + inserción)
*/
router.get("/add-inventory", invController.buildAddInventory);

router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  invController.addInventory
);

module.exports = router
