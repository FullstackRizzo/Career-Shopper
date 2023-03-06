const router = require ('express').Router()

const {
    models: { Order }, models,
} = require('../db')


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



module.exports = router;
