const router = require('express').Router()
const {models : {OrderItems}} = require('../db') 
const Career = require('../db/models/Career')

router.get('/', async (req, res, next) => {
    try { 
        const orderItems = await OrderItems.findAll()
        res.send(orderItems)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async(req, res, next)=>{
    try{
        const orderItems = await OrderItems.findByPk(req.params.id, {
            include: [
                {
                    model: Career
                }
            ]
        })
        return res.send(orderItems)
    }
    catch(err){
        next(err)
    }
})


router.delete('/:id', async (req,res,next)=>{
    try{
        const orderItems = await OrderItems.findByPk(req.params.id);
        await orderItems.destroy();
        res.send(orderItems);
    }
    catch(err){
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
      const orderItem = await OrderItems.findByPk(id)
  
      const updatedOrderItem = await orderItem.update({ quantity });
      
      res.send(updatedOrderItem);
    } catch (error) {
      next(error);
    }
  });

module.exports = router
