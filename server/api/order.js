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

// router.get('/:orderId', async (req, res, next) => {
//     try {
//         const order = await Order.findByPk(req.params.orderId, {
//             include: [{model: Career, through: OrderItems}]
//         })
//         res.json(order)
//     } catch (err) {
//         next(err)
//     }
// });

// router.get('/:orderId/users', async (req, res, next) => {
//     try {
//         const order = await Order.findByPk(req.params.orderId, {
//             include: [{model: User}]
//         })
//         res.json(order)
//     } catch (err) {
//         next(err)
//     }
// });

// router.get('/:orderId/careers', async (req, res, next) => {
//     try {
//         const order = await Order.findByPk(req.params.orderId, {
//             include: [{model: Career, through: OrderItems}]
//         })
//         res.json(order)
//     } catch (err) {
//         next(err)
//     }
// });

// router.post('/', async (req, res, next) => {
//     try {
//         const order = await Order.create(req.body)
//         res.json(order)
//     } catch (err) {
//         next(err)
//     }
// });

// router.put('/:orderId', async (req, res, next) => {
//     try {
//         const order = await Order.findByPk(req.params.orderId)
//         await order.update(req.body)
//         res.json(order)
//     } catch (err) {
//         next(err)
//     }
// });

// router.delete('/:orderId', async (req, res, next) => {
//     try {
//         const order = await Order.findByPk(req.params.orderId)
//         await order.destroy()
//         res.json(order)
//     } catch (err) {
//         next(err)
//     }
// });

module.exports = router;