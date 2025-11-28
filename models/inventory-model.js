const pool = require("../database/")

/* ===============================
   GET ALL CLASSIFICATIONS
   =============================== */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  )
}

/* ===============================
   ADD NEW CLASSIFICATION
   =============================== */
async function addClassification(classification_name) {
  try {
    const sql = `
      INSERT INTO public.classification (classification_name)
      VALUES ($1)
      RETURNING *;
    `
    const result = await pool.query(sql, [classification_name])
    return result.rows[0]
  } catch (error) {
    console.error("ERROR addClassification:", error)
    return null
  }
}

/* ===============================
   GET INVENTORY BY CLASSIFICATION
   =============================== */
async function getInventoryByClassificationId(classification_id) {
  const sql = `
    SELECT * FROM public.inventory AS i
    JOIN public.classification AS c
    ON i.classification_id = c.classification_id
    WHERE i.classification_id = $1
  `
  const data = await pool.query(sql, [classification_id])
  return data.rows
}

/* ===============================
   GET VEHICLE BY ID
   =============================== */
async function getVehicleById(inv_id) {
  const sql = `
    SELECT * FROM public.inventory AS i
    JOIN public.classification AS c
    ON i.classification_id = c.classification_id
    WHERE inv_id = $1
  `
  const data = await pool.query(sql, [inv_id])
  return data.rows[0]
}

/* ===============================
   ADD NEW VEHICLE
   =============================== */
async function addInventory(vehicleData) {
  try {
    const sql = `
      INSERT INTO public.inventory 
        (inv_make, inv_model, inv_description, inv_image, 
         inv_thumbnail, inv_price, inv_year, inv_miles, 
         inv_color, classification_id)
      VALUES 
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `

    const params = [
      vehicleData.inv_make,
      vehicleData.inv_model,
      vehicleData.inv_description,
      vehicleData.inv_image,
      vehicleData.inv_thumbnail,
      vehicleData.inv_price,
      vehicleData.inv_year,
      vehicleData.inv_miles,
      vehicleData.inv_color,
      vehicleData.classification_id
    ]

    const result = await pool.query(sql, params)
    return result.rows[0]

  } catch (error) {
    console.error("ERROR addInventory:", error)
    return null
  }
}

module.exports = {
  getClassifications,
  addClassification,
  getInventoryByClassificationId,
  getVehicleById,
  addInventory
}
