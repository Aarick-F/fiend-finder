let fiendList = require("../data/fiends");

module.exports = function(app) {

  app.get("/api/fiends", (req, res) => {
    res.json(fiendList);
  });

  app.post("/api/fiends", (req, res) => {
    fiendList.push(req.body);
  });

}