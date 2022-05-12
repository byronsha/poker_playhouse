module.exports = {
  apps : [{
    name: 'pokerhouse',
    script: './server/index.js',
    env:{
      JWT_SECRET:"test",
      PORT:8000,
      NODE_ENV:"production"
    },
  }],
};