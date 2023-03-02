const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../db');

const Career = db.define('career', {
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
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 25
    }
});

module.exports = Career;
