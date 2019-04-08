module.exports = function(sequelize, DataTypes) {
    var Transaction = sequelize.define("Transaction", {
      type: {type:DataTypes.STRING, allowNull:false},
      from: {type:DataTypes.STRING, allowNull:false},
      to: {type:DataTypes.STRING, allowNull:false},
      fromUser: {type:DataTypes.STRING, allowNull:false},
      toUser: {type:DataTypes.STRING, allowNull:false},
      amount: {type:DataTypes.DECIMAL(10,2), allowNull:false},
      endingBalance: {type:DataTypes.DECIMAL(10,2), allowNull:false}  
    });

    Transaction.associate = function(models) {
        Transaction.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Transaction;
  };
  