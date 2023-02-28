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
