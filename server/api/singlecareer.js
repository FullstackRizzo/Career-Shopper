const router = require('express').Router();
const { models: { Career }} = require('../db');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    return res.json(career);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req,res,next)=>{
  try{
      const career = await Career.findByPk(req.params.id);
      await career.destroy();
      res.send(career);
  }
  catch(err){
      next(err);
  }
});

router.put('/:id', async (req,res,next)=>{
  try{
    const career = await Career.findByPk(req.params.id);
    res.send(await career.update(req.body))
  }
  catch(err){
    next(err)
  }
})

