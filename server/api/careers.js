const router = require('express').Router();
const { models: { Career }} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const careers = await Career.findAll();
    res.json(careers);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req,res,next)=>{
  try{
    res.status(201).send(await Career.create(req.body));
  }
  catch(err){
    next(err)
  }
})