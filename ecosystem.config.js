module.exports = {
  apps : [{
    name: 'test_db',
    test_user: 'qwerty',
    script: './server/index.js',
    env:{
      JWT_SECRET:"test",
      PORT:3000,
      NODE_ENV:"production"
    },
  }],
};