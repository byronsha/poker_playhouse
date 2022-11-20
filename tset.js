const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = {
  database: 'totalpoker',
  username: 'user',
  password: '1',
  dialect: 'postgres',
  port: '5888'
}

console.log('>>> ', __dirname + '/../config/config.json');

const db = {};

let sequelize;

console.log('>>> ',config)
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log('>>',config.database, config.username, config.password, config)
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.authenticate().then(function(errors) { console.log(errors) });