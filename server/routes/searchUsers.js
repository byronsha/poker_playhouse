const db = require('../db/models');
const jwt = require('jsonwebtoken');

module.exports = {
  search(req, res) {
    jwt.verify(req.query.accessToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(404).json({
          error: true,
          message: 'JWT invalid'
        })
      }

      const user = await db.User.findById(decoded.id)
      if (!user) throw new Error('User not found');

      const query = req.query.searchQuery;
      if (!query) res.send({ searchResults: [] })

      const searchResults = await db.User.findAll({
        where: { username: { $iLike: `%${query}%` } },
        limit: 20,
      });

      res.send({ searchResults });
    });
  },

  getAllUsers(res, req) {
    db.User.findAll({
      include: [{
        model: db.Account,
      }],
    }).then(users => {

      let results = users.reduce((acc, item) => {
        return [ ...acc, ...item.Accounts]
      }, [])

      results = results.map((item) => ({
        position: item.experience,
        nickname: item.name,
        winCount: '???',
        score: item.tokens,
      }));

      req.json(results)      
    })

  }
}