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
  })

  return UserHand
}