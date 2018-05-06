module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bankroll: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 100.00
    }
  });

  User.associate = models => {
    User.hasMany(models.UserHand, { foreignKey: 'user_id' });
    User.hasMany(models.GroupMember, { foreignKey: 'user_id' });
    User.hasMany(models.GroupInvite, { foreignKey: 'inviter_id', as: 'sent_invites' })
    User.hasMany(models.GroupInvite, { foreignKey: 'invited_id', as: 'received_invites' })
  };

  return User;
};