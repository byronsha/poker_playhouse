module.exports = {
  apps : [{
    name: 'test_db',
    test_user: 'qwerty',
    script: './server/index.js',
    env:{
      JWT_SECRET:"test",
      PORT:5432,
      NODE_ENV:"production"
    },
  }],
};