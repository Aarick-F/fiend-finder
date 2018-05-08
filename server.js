// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// APP SETUP
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app/public'));

// ROUTER
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// LISTENER
app.listen(PORT, err => {
  if(err) throw err;
  console.log("App listening on port: " + PORT);
});