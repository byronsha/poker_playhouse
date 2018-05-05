const db = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  handHistory(req, res) {
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

          const limit = 20;
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
                order: [
                  ['createdAt', 'desc'],
                ],
              })
                .then(hands => {
                  res.send({
                    hands: hands,
                    count: data.count,
                    pages: pages,
                  })
                })
                .catch(err => {
                  res.status(500).send(`Internal Server Error: ${err}`)
                })
            })
            .catch(err => {
              res.status(500).send(`Internal Server Error: ${err}`)
            })
        })
    })
  },
}