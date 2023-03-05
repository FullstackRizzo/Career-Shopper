const router = require('express').Router()

router.use ('/career', require('./Career'))
router.use ('/user', require('./User'))
router.use ('/cart', require ('./Cart'))

router.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
    })

module.exports = router