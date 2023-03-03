const Sequelize = require('sequelize')
const db = require('../db')
 const Cart = db.define('cart', {

        id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        quantity: {
            type: Sequelize.INTEGER,
        },
        completed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    })

module.exports = Cart