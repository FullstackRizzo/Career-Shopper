const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/careers', require('./careers'))
router.use('/singlecareer', require('./singlecareer')) // Add this line
router.use('/orders', require('./order'))
router.use('/orderitems', require('./orderItems'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})