const db = require('../db/models')
const jwt = require('jsonwebtoken');

module.exports = {
  fetchInvites(req, res) {
    jwt.verify(req.body.accessToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(404).json({
          error: true,
          message: 'Invalid access token'
        })
      }

      const user = await db.User.findById(decoded.id)
      if (!user) throw new Error('User not found');

      const invites = await db.GroupInvite.findAll({
        where: { invited_id: user.id },
      });

      res.send({ invites });
    })
  },
  // createInvite(req, res) {

  // },
  // deleteInvite(req, res) {

  // },
}