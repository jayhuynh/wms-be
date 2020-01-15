const Sequelize = require('sequelize')
const config = require('../config/database')[process.env.NODE_ENV]

//set up connection 
const db = new Sequelize(
    config.database,
    config.username,
    config.password, {
        host: config.host,
        dialect: config.dialect,
        dialectOptions: config.dialectOptions
    })

//Test connection
db.authenticate().then(() => {
    console.log('Successfully connected to database!')
}).catch((e) => {
    console.log('Unable to connect to database: ', e)
})

module.exports={db,Sequelize}