const router = require ('express').Router()

const {
    models: { Order, Career, OrderItems, User},
} = require('../db')


router.get('/', async (req, res, next) => {
    try {
        const order = await Order.findAll()
        res.json(order)
    } catch (err) {
        next(err)
    }
});



module.exports = router;