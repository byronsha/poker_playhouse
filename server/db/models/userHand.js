module.exports = function(sequelize, DataTypes) {
  const UserHand = sequelize.define('UserHand', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    hand_id: {
      type: DataTypes.INTEGER,
    },
  });

  UserHand.associate = models => {
    UserHand.belongsTo(models.User, { foreignKey: 'user_id' })
    UserHand.belongsTo(models.Hand, { foreignKey: 'hand_id' })
  };

  return UserHand;
};