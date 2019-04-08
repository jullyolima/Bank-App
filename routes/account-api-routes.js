var db = require("../models");

module.exports = function(app) {
  // Get all accounts
  app.get("/api/accounts", function(req, res) {
    db.Account.findAll({}).then(function(dbAccount) {
      res.json(dbAccount);
    });
  });

  // Get a specific Account
  app.get("/api/accounts/:id", function(req, res){
    db.Account.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbAccount){
      res.json(dbAccount);
    });
  });

  // Create a new Account
  app.post("/api/accounts", function(req, res) {
    db.Account.create({
      type: "checking",
      balance: req.body.initialDeposit,
      isOpen: true
    }).then(function(dbAccount) {
      res.json(dbAccount);
    });
  });

  // Delete an Account by id
  app.delete("/api/accounts/:id", function(req, res) {
    db.Account.destroy({ where: { id: req.params.id } }).then(function(dbAccount) {
      res.json(dbAccount);
    });
  });
};