module.exports = function (sequelize, DataTypes) {
  const Hand = sequelize.define('Hand', {
    history: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  Hand.associate = models => {
    Hand.hasMany(models.UserHand, { foreignKey: 'hand_id' });
  };

  return Hand;
};