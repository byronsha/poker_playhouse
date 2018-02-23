module.exports = function (sequelize, DataTypes) {
  const Hand = sequelize.define('Hand', {
    history: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  })

  return Hand
}