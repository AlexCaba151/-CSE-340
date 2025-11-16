const { Pool } = require("pg")
require("dotenv").config()

let pool

// 🔥 Render siempre usa production => SSL obligatorio
if (process.env.RENDER) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })
} 
// 🔥 Local development
else if (process.env.NODE_ENV === "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })
}
// 🔥 Default fallback
else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })
}

// Debug logger
module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      console.log("executed query:", text)
      return res
    } catch (err) {
      console.error("DB ERROR:", err)
      throw err
    }
  },
}
