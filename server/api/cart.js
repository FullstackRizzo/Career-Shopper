const router = require ('express').Router()

const {
    models: { Cart, Career},
} = require('../db')

router.get('/', async (req, res, next) => {
    try {
        const cart = await Cart.findAll({})
        res.json(cart)
    } catch (err) {
        next(err)
    }
});

router.get("/myCart", async (req, res, next) => {
    try {
        const cart = await Cart.findAll({
            where: {
                userId: req.user.id,
                completed: false,
            },
            include: Career,
        });
        res.json(cart);
    } catch (err) {
        next(err);
    }
});

router.get("/myOrders", async (req, res, next) => {
    try {
        const cart = await Cart.findAll({
            where: {
                userId: req.user.id,
                completed: true,
            },
            include: Career,
        });
        res.json(cart);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const cart = await Cart.findByPk(req.params.id)
           res.send(cart);
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const cart = await Cart.create(req.body)
        res.send(cart)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const cart = await Cart.findByPk(req.params.id)
        await cart.update(req.body)
        res.send(cart)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const cart = await Cart.findByPk(req.params.id)
        cart.destroy()
        res.send(cart)
    } catch (err) {
        next(err)
    }
});

module.exports = router;