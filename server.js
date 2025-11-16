/********************************************
 * Primary Server File: server.js
 ********************************************/

const express = require("express")
const path = require("path")
const app = express()

const PORT = process.env.PORT || 3000

// Controllers
const baseController = require("./controllers/baseController")

// Routes
const inventoryRoute = require("./routes/inventoryRoute")
const errorRoute = require("./routes/errorRoute")
const utilities = require("./utilities")

/********************************************
 * View Engine Setup
 ********************************************/
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

/********************************************
 * Serve Static Files
 ********************************************/
app.use(express.static(path.join(__dirname, "public")))

/********************************************
 * Debug Logger
 ********************************************/
app.use((req, res, next) => {
  console.log(`[v0] ${req.method} ${req.url}`)
  next()
})

/********************************************
 * Application Routes
 ********************************************/

// HOME (MVC)
app.get("/", baseController.buildHome)

// Inventory routes
app.use("/inv", inventoryRoute)

// Error test route (Task 3)
app.use("/error", errorRoute)

/********************************************
 * 404 Not Found Middleware (Task 2)
 ********************************************/
app.use(async (req, res, next) => {
  const nav = await utilities.getNav()
  res.status(404).render("errors/error", {
    title: "404 - Not Found",
    nav,
    message: "Sorry, the page you requested was not found.",
    status: 404
  })
})

/********************************************
 * Global Error Handler (Task 2 & 3)
 ********************************************/
app.use(async (err, req, res, next) => {
  console.error("SERVER ERROR:", err)

  const nav = await utilities.getNav()
  const status = err.status || 500

  res.status(status).render("errors/error", {
    title: status === 500 ? "Server Error" : "Application Error",
    nav,
    message: err.message || "An unexpected error occurred.",
    status
  })
})

/********************************************
 * Start Server
 ********************************************/
app.listen(PORT, () => {
  console.log("\n==================================================")
  console.log(`Server running on http://localhost:${PORT}`)
  console.log("==================================================")
})
