/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()
const PORT = process.env.PORT || 3000

// View engine setup
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

const publicPath = path.join(__dirname, "public")
app.use(
  express.static(publicPath, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css")
      }
    },
  }),
)

app.use((req, res, next) => {
  console.log(`[v0] ${req.method} ${req.url}`)
  next()
})

app.get("/test-css", (req, res) => {
  const cssPath = path.join(__dirname, "public", "css", "styles.css")
  if (fs.existsSync(cssPath)) {
    res.send(`
      <h1>CSS Test Page</h1>
      <p>CSS file exists at: ${cssPath}</p>
      <p>Try accessing it at: <a href="/css/styles.css">/css/styles.css</a></p>
      <p>File size: ${fs.statSync(cssPath).size} bytes</p>
    `)
  } else {
    res.send(`<h1>ERROR: CSS file not found at ${cssPath}</h1>`)
  }
})

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home | CSE Motors",
    filename: path.join(__dirname, "views", "index.ejs"),
  })
})

app.get("/custom", (req, res) => {
  res.render("index", {
    title: "Custom | CSE Motors",
    filename: path.join(__dirname, "views", "index.ejs"),
  })
})

app.get("/sedan", (req, res) => {
  res.render("index", {
    title: "Sedan | CSE Motors",
    filename: path.join(__dirname, "views", "index.ejs"),
  })
})

app.get("/suv", (req, res) => {
  res.render("index", {
    title: "SUV | CSE Motors",
    filename: path.join(__dirname, "views", "index.ejs"),
  })
})

app.get("/truck", (req, res) => {
  res.render("index", {
    title: "Truck | CSE Motors",
    filename: path.join(__dirname, "views", "index.ejs"),
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err)
  res.status(500).send("Something went wrong!")
})

// Start server
app.listen(PORT, () => {
  console.log(`\n${"=".repeat(50)}`)
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`${"=".repeat(50)}`)
  console.log(`Views directory: ${path.join(__dirname, "views")}`)
  console.log(`Public directory: ${publicPath}`)

  const cssPath = path.join(__dirname, "public", "css", "styles.css")
  if (fs.existsSync(cssPath)) {
    console.log(`[v0] ✓ CSS file found at: ${cssPath}`)
    console.log(`[v0] ✓ CSS file size: ${fs.statSync(cssPath).size} bytes`)
    console.log(`[v0] ✓ CSS should be accessible at: http://localhost:${PORT}/css/styles.css`)
  } else {
    console.log(`[v0] ✗ CSS file NOT found at: ${cssPath}`)
  }
  console.log(`\nTest CSS serving at: http://localhost:${PORT}/test-css`)
  console.log(`${"=".repeat(50)}\n`)
})
