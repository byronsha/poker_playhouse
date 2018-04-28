const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const lodash = require('lodash')
const db = {}

let sequelize

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL)
} else {
  sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  )
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== '__test__')
  })
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.UserHand.belongsTo(db.User, { foreignKey: 'user_id' })
db.UserHand.belongsTo(db.Hand, { foreignKey: 'hand_id' })

db.User.hasMany(db.UserHand, { foreignKey: 'user_id' })
db.Hand.hasMany(db.UserHand, { foreignKey: 'hand_id' })

db.GroupMember.belongsTo(db.User, { foreignKey: 'user_id' })
db.GroupMember.belongsTo(db.Group, { foreignKey: 'group_id' })

db.User.hasMany(db.GroupMember, { foreignKey: 'user_id' })
db.Group.hasMany(db.GroupMember, { foreignKey: 'group_id' })

db.GroupInvite.belongsTo(db.User, { foreignKey: 'inviter_id', as: 'inviter' })
db.GroupInvite.belongsTo(db.User, { foreignKey: 'invited_id', as: 'invited' })
db.GroupInvite.belongsTo(db.Group, { foreignKey: 'group_id', as: 'group' })

db.User.hasMany(db.GroupInvite, { foreignKey: 'inviter_id', as: 'sent_invites' })
db.User.hasMany(db.GroupInvite, { foreignKey: 'invited_id', as: 'received_invites' })
db.Group.hasMany(db.GroupInvite, { foreignKey: 'group_id', as: 'group_invites' })

module.exports = lodash.extend({
  sequelize: sequelize, 
  Sequelize: Sequelize
}, db)