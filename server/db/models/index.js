const router = require('express').Router()

router.use ('/career', require('./Career'))
router.use ('/user', require('./User'))
router.use ('/order', require ('./Order'))

router.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
    })

module.exports = router