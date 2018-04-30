module.exports = function (sequelize, DataTypes) {
  const Group = sequelize.define('Group', {
    creator_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
  })

  return Group
}
