module.exports = function (sequelize, DataTypes) {
  const GroupMember = sequelize.define('GroupMember', {
    group_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    bankroll: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.00,
    }
  })

  return GroupMember
}
