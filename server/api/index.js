const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/careers', require('./careers'))
router.use('/singlecareer', require('./singlecareer')) // Add this line
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
