const express = require('express')
const router = express.Router()
const db = require('../models')
const utils = require('../utils')
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

if (!process.env.JWT_SECRET) {
  console.error('ERROR!: Please set JWT_SECRET before running the app. \n run: export JWT_SECRET=...')
  process.exit();
}

router.post('/signup', (req, res, next) => {
  const body = req.body
  const hash = bcrypt.hashSync(body.password.trim())

  db.User
    .find({where: {username: body.username}})
    .then(user => {
      if (!user) {
        db.User.create({
          username: body.username,
          password: hash
        })
        .then(user => {
          res.send({
            user: utils.getCleanUser(user),
            token: utils.generateToken(user)
          })
        })
      } else {
        return res.status(404).json({
          error: true,
          message: 'Username already exists'
        })
      }
    })
})

router.post('/login', (req, res, next) => {
  const body = req.body

  db.User
    .find({where: {username: body.username}})
    .then(user => {
      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'Username or password is wrong'
        })
      }

      bcrypt.compare(body.password, user.password, (err, valid) => {
        if (!valid) {
          return res.status(404).json({
            error: true,
            message: 'Username or password is wrong'
          })
        }

        res.send({
          user: utils.getCleanUser(user),
          token: utils.generateToken(user)
        })
      })
    })
})

module.exports = router