const pool = require("../database/")

/* Get all classifications */
async function getClassifications() {
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* Get inventory by classification */
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

/* NEW: Get a specific vehicle by ID */
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

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleById
}
