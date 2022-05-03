module.exports = function (sequelize, DataTypes) {
  const Account = sequelize.define('Account', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
	level: {
      type: DataTypes.INTEGER,
    },
    tokens: {
      type: DataTypes.INTEGER,
    },
	experience: {
      type: DataTypes.INTEGER,
    },
  });

  Account.associate = models => {
  	Account.belongsTo(models.User, { foreignKey: 'user_id' })
  };;

  return Account;
};
