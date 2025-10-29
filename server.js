/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const staticRoutes = require("./routes/static");

const app = express();

/* ***********************
 * View Engine Configuration
 *************************/
app.set("view engine", "ejs");
app.set("views", [path.join(__dirname, "views"), path.join(__dirname, "partials")]);
app.set("layout", "layouts/layout");
app.use(expressLayouts);

/* ***********************
 * Routes
 *************************/
app.get("/", (_, res) => {
  res.render("index", { title: "Home" });
});

app.use(staticRoutes);

/* ***********************
 * Local Server Information
 *************************/
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

/* ***********************
 * Start the server
 *************************/
app.listen(PORT, () => {
  console.log(`App listening on http://${HOST}:${PORT}`);
});
