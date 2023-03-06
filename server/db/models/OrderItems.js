const Sequelize = require('sequelize');
const db = require('../db');

const OrderItems = db.define('order_item', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER,
    },
});

module.exports = OrderItems;