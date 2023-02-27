const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    salary: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    timeOfCompletion: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    description: {
      type: Sequelize.TEXT
    },
    cost: {
      type: INTEGER
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });
  
  module.exports = Product;
  