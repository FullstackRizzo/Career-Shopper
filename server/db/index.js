//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Career = require('./models/Career')
const Cart = require('./models/Cart')
//associations could go here!

User.hasMany(Cart)
Career.hasMany(Cart)
Cart.belongsTo(Career)

module.exports = {
  db,
  models: {
    User,
    Career,
    Cart
  },
}
