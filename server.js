/********************************************
 * Primary Server File: server.js
 ********************************************/
const session = require("express-session")
const pool = require('./database/')
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
 * Body Parsing Middleware (NECESARIO)
 ********************************************/
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


/********************************************
 * Session & Flash Middleware
 ********************************************/
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      createTableIfMissing: true,
      pool,
    }),
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: true,
    saveUninitialized: true,
    name: "sessionId",
  })
)

app.use(require("connect-flash")())

// Allow flash messages in all views
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res)
  next()
})


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

// Inventory routes (Assignment 4)
app.use("/inv", inventoryRoute)

// Error test route
app.use("/error", errorRoute)


/********************************************
 * 404 Not Found Middleware
 ********************************************/
app.use(async (req, res, next) => {
  const nav = await utilities.getNav()
  res.status(404).render("errors/error", {
    title: "404 - Not Found",
    nav,
    message: "Sorry, the page you requested was not found.",
    status: 404,
  })
})


/********************************************
 * Global Error Handler
 ********************************************/
app.use(async (err, req, res, next) => {
  console.error("SERVER ERROR:", err)

  const nav = await utilities.getNav()
  const status = err.status || 500

  res.status(status).render("errors/error", {
    title: status === 500 ? "Server Error" : "Application Error",
    nav,
    message: err.message || "An unexpected error occurred.",
    status,
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
