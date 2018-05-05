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
  });

  Group.associate = models => {
    Group.hasMany(models.GroupMember, { foreignKey: 'group_id' });
    Group.hasMany(models.GroupInvite, { foreignKey: 'group_id', as: 'group_invites' });
  };;

  return Group;
};
