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
  });

  GroupMember.associate = models => {
    GroupMember.belongsTo(models.User, { foreignKey: 'user_id' });
    GroupMember.belongsTo(models.Group, { foreignKey: 'group_id' });
  };

  return GroupMember;
};
