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

router.post('/', async (req,res,next)=>{
    try{
      res.status(201).send(await OrderItems.create(req.body));
    }
    catch(err){
      next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    const { quantity } = req.body;
    const { id } = req.params;
    
    try {
      const orderItem = await OrderItems.findByPk(id);
      
      if (!orderItem) {
        return res.status(404).send({ error: 'Order item not found' });
      }
  
      const updatedOrderItem = await orderItem.update({ quantity });
      
      res.send(updatedOrderItem);
    } catch (error) {
      next(error);
    }
  });

module.exports = router
