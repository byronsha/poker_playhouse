const express = require('express')
const router = express.Router()
const authRoute = require('./auth');
const handsRoute = require('./hands');
const groupsRoute = require('./groups');
const searchUsersRoute = require('./searchUsers');

if (!process.env.JWT_SECRET) {
  console.error('ERROR!: Please set JWT_SECRET before running the app. \n run: export JWT_SECRET=...')
  process.exit();
}

router.post('/signup', authRoute.signup);
router.post('/login', authRoute.login);
router.post('/verify_jwt', authRoute.verifyToken);

router.post('/hand-history/:page', handsRoute.handHistory);

router.get('/groups', groupsRoute.fetchGroups);
router.post('/groups', groupsRoute.createGroup);
router.delete('/groups/:groupId', groupsRoute.deleteGroup);

router.get('/users/search', searchUsersRoute.search);

module.exports = router;