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

router.post('/verify_jwt', (req, res, next) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(404).json({
        error: true,
        message: 'JWT invalid'
      })
    }

    db.User
      .find({where: {id: decoded.id}})
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: true,
            message: 'JWT invalid'
          })
        }

        res.send({
          user: utils.getCleanUser(user),
          token: utils.generateToken(user)
        })
      })
  })
})

router.post('/hand-history/:page', (req, res, next) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(404).json({
        error: true,
        message: 'JWT invalid'
      })
    }

    db.User
      .find({ where: { id: decoded.id } })
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: true,
            message: 'JWT invalid'
          })
        }

        const limit = 10;
        let offset = 0;
      

        db.Hand.findAndCountAll({
          include: [{
            model: db.UserHand,
            where: { user_id: user.id },
          }]
        })
          .then(data => {
            const page = req.params.page;
            const pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
      
            db.Hand.findAll({
              include: [{
                model: db.UserHand,
                where: { user_id: user.id },
              }],
              limit,
              offset,
              $sort: { id: 1 }
            })
            .then(hands => {
              res.send({
                hands: hands,
                count: data.count,
                pages: pages,
              })
            })
            .catch(err => {
              res.status(500).send('Internal Server Error')
            })
          })
          .catch(err => {
            res.status(500).send('Internal Server Error')
          })
      })
  })
})

module.exports = router