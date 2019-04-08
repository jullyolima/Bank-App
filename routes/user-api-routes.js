var db = require("../models");

module.exports = function (app) {
 // Get all users
 app.get("/api/users", function (req, res) {
  db.User.findAll({}).then(function (dbUser) {
   res.json(dbUser);
  });
 });

 // Get a specific user
 app.get("/api/users/:id", function (req, res) {
  db.User.findOne({
   where: {
    id: req.params.id
   }
  }).then(function (dbUser) {
   res.json(dbUser);
  });
 });

 // Create a new user
 app.post("/api/users", function (req, res) {
  db.User.create({
   firstName: req.body.firstName,
   lastName: req.body.lastName,
   addressLine1: req.body.addressLine1,
   addressLine2: req.body.addressLine2,
   city: req.body.city,
   state: req.body.state,
   zip: req.body.zip,
   SSN: req.body.SSN,
   DOB: req.body.DOB,
   email: req.body.email,
   username: req.body.username
  }).then(function (dbUser) {
   res.json(dbUser);
   console.log("posted");
  });
 });

 // Delete an user by id
 app.delete("/api/users/:id", function (req, res) {
  db.User.destroy({ where: { id: req.params.id } }).then(function (dbUser) {
   res.json(dbUser);
  });
 });
};