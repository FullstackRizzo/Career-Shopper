const router = require('express').Router()
const { models: { User, Order, OrderItems, Career }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where : {
        id : req.params.id
      }, 
      include: [{model: Order }]
    })
    
    res.send(user)
  } catch (err) {
    next(err)
    }
});

router.get("/:userId/orders", async (req, res, next) => {
  try {
      const user = await User.findByPk(req.params.userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      const orders = await Order.findAll({
          where: {
              userId: req.params.userId
          },
          include:  [{model: Career, through: OrderItems}]
      });
      res.send(orders);
  } catch (err) {
      next(err);
  }
});
