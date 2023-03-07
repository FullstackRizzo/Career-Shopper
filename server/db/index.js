//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Career = require('./models/Career')
const Order = require('./models/Order')
const OrderItems = require('./models/OrderItems')
//associations could go here!
User.hasMany(Order)
Order.belongsTo(User)
Order.belongsToMany(Career, {through: OrderItems})
Career.belongsToMany(Order, {through: OrderItems})
Order.hasMany(OrderItems);
OrderItems.belongsTo(Order)
OrderItems.belongsTo(Career)

module.exports = {
  db,
  models: {
    User,
    Career,
    Order,
    OrderItems
  },
}