const db = require('../db/models')
const jwt = require('jsonwebtoken');

module.exports = {
  fetchGroups(req, res) {
    jwt.verify(req.query.access_token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          error: true,
          message: 'Invalid access token'
        })
      }

      db.Group.findAll({
        include: [{
          model: db.GroupMember,
          where: { user_id: decoded.id },
        }],
      })
        .then(groups => {
          res.send({
            groups: groups,
          })
        })
        .catch(err => {
          res.status(500).send(`Internal Server Error: ${err}`)
        })
    })
  },
  createGroup(req, res) {
    jwt.verify(req.body.accessToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(404).json({
          error: true,
          message: 'Invalid access token'
        })
      }

      const user = await db.User.findById(decoded.id)
      if (!user) throw new Error('User not found');

      let group;
      await db.sequelize.transaction(async transaction => {
        group = await db.Group.create({
          creator_id: user.id,
          name: req.body.groupAttrs.name,
          code: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        }, { transaction })
        await db.GroupMember.create({
          group_id: group.id,
          user_id: user.id,
          is_admin: true,
          bankroll: 0,
        }, { transaction })
      })

      const createdGroup = await db.Group.findOne({
        where: { id: group.id },
        include: [{
          model: db.GroupMember,
        }]
      })

      if (!createdGroup) {
        res.status(500).send('Failed to create group');
      }

      res.send({ group: createdGroup });
    })
  },
  deleteGroup(req, res) {
    jwt.verify(req.query.accessToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(404).json({
          error: true,
          message: 'Invalid access token'
        })
      }

      const group = await db.Group.findOne({
        where: {
          $and: {
            id: req.params.groupId,
            creator_id: decoded.id,
          }
        }
      })

      if (!group) {
        res.status(500).send('Could not find group to delete');
      }

      await group.destroy();
      res.send({ deletedGroupId: group.id })
    })
  }
}