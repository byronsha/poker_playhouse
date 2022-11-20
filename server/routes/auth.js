const db = require('../db/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const utils = require('../utils');

module.exports = {
  signup(req, res) {
    const { body } = req;
    // console.log('>> ', body);
    const hash = bcrypt.hashSync(body.password.trim())

    console.log('db.User >> ', db.User);

    db.User
      .findOne({ where: { username: body.username } })
      .then(user => {
        if (!user) {
          db.User.create({
            username: body.username,
            password: hash,
            Accounts: [
              {
                name: body.username + ' account1',
                level: 1,
                tokens: 100,
                experience: 0,
              },
              {
                name: body.username + ' account2',
                level: 10,
                tokens: 100000,
                experience: 0,
              }
            ]
          }, {
            include: [ db.Account ]
          }).then(user => {
              console.log('user ', user);

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
  },
  login(req, res) {
    const { body } = req;

    db.User
      .findOne({ where: { username: body.username } })
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
  },
  verifyToken(req, res) {
    jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          error: true,
          message: 'JWT invalid'
        })
      }

      db.User
        .findOne({
          where: { id: decoded.id },
          include: [{
            model: db.Account,
          }]
        })
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
  },
}