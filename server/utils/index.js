const jwt = require('jsonwebtoken')

function generateToken(user) {
  var u = {
    id: user.id,
    username: user.username,
    location: user.location,
    bankroll: user.bankroll,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }

  return token = jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  })
}

function getCleanUser(user) {
  if (!user) return {}

  console.log('user ', JSON.stringify(user));


  return {
    id: user.id,
    username: user.username,
    location: user.location,
    bankroll: user.bankroll,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    accounts: user.Accounts
  }
}

module.exports = {
  generateToken,
  getCleanUser
}