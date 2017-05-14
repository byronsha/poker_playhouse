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

  return {
    id: user.id,
    username: user.username,
    location: user.location,
    bankroll: user.bankroll,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}

module.exports = {
  generateToken,
  getCleanUser
}