const router = require('express').Router()
const {models : {OrderItems}} = require('../db') 

router.get('/', async (req, res, next) => {
    try { 
        const orderItems = await OrderItems.findAll()
        res.send(orderItems)
    } catch (err) {
        next(err)
    }
})


module.exports = router


