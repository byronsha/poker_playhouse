const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const lodash = require('lodash')
const db = {}

let sequelize

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL)
} else {
  sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  )
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== '__test__')
  })
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

module.exports = lodash.extend({
  sequelize: sequelize, 
  Sequelize: Sequelize
}, db)