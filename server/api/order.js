const router = require ('express').Router()

const {
    models: { Order },
} = require('../db');
const Career = require('../db/models/Career');
const OrderItems = require('../db/models/OrderItems');


router.get('/', async (req, res, next) => {
    try {
        const order = await Order.findAll()
        res.json(order)
    } catch (err) {
        next(err)
    }
});

router.post('/', async (req,res,next)=>{
    try{
      res.status(201).send(await Order.create(req.body));
    }
    catch(err){
      next(err)
    }
})

router.get('/:id', async(req,res,next)=>{
    try{
        const order = await Order.findByPk(req.params.id, {
            include: [
                {
                    model: OrderItems,
                    include:[{model: Career}],
                }
            ],
        });
        res.send(order)
    }
    catch(err){
        next(err)
    }
})

router.put('/:id', async(req, res, next) => {
    try {
      const orderId = req.params.id;
      const updatedOrder = req.body;
  
      const order = await Order.findByPk(orderId);
  
      const result = await order.update(updatedOrder);
      res.json(result);
    } catch (error) {
      next(error);
    }
});



module.exports = router;