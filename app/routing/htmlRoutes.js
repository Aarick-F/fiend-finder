const path = require("path");

module.exports = function(app) {

  // HOME
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"));
    // res.send("Home Page");
  });

  // SURVEY PAGE
  app.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  // OTHER QUERY HANDLER
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

}