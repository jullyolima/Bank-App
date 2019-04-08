module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define("Account", {
    type: {type:DataTypes.STRING, allowNull:false},
    balance: {type:DataTypes.STRING, allowNull:false},
    isOpen: {type:DataTypes.BOOLEAN, allowNull:false}
  });

  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      foreignKey: "id", targetKey: "id"
    });
  };

  return Account;
};
