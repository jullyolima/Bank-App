var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load Dashboard
  app.get("/dashboard", function(req, res) {
    db.Account.findOne({
      where: {
        id: 2
      }
    }).then(function(dbExamples) {
      console.log(dbExamples.dataValues.balance);
      res.render("dashboard", {
        amount: dbExamples.dataValues.balance,
        examples: dbExamples
      });
    });
  });

  // Load Transfer
  app.get("/transfer", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("transfer", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load Withdrawal
  // Load Dashboard
  app.get("/withdrawal", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("withdrawal", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
