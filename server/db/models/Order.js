const Sequelize = require('sequelize')
const db = require('../db')

 const Order = db.define('order', {

        completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        total: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
    })

module.exports = Order