module.exports = function (sequelize, DataTypes) {
  const GroupInvite = sequelize.define('GroupInvite', {
    group_id: {
      type: DataTypes.INTEGER,
    },
    inviter_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    invited_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accepted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  })

  return GroupInvite
}
