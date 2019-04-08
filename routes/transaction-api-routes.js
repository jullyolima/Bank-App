var db = require("../models");

module.exports = function(app) {
  // Get all transactions
  app.get("/api/transaction", function(req, res) {
    db.Transaction.findAll({}).then(function(dbTransaction) {
      res.json(dbTransaction);
    });
  });

  // Get a specific transaction
  app.get("/api/transaction/:id", function(req, res){
    db.Transaction.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbTransaction){
      res.json(dbTransaction);
    });
  });

  // Create a new transaction
  app.post("/api/transaction", function(req, res) {
    db.Transaction.create(req.body).then(function(dbTransaction) {
      res.json(dbTransaction);
    });
  });

  // Delete an transaction by id
  app.delete("/api/transaction/:id", function(req, res) {
    db.Transaction.destroy({ where: { id: req.params.id } }).then(function(dbTransaction) {
      res.json(dbTransaction);
    });
  });
};