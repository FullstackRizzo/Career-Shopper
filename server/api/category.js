const router = require('express').Router();
const { models: { Career }} = require('../db');
module.exports = router;

router.get('/categories', async (req, res, next) => {
    try {
      const categories = await Career.findAll({
        attributes: ['category'],
        group: ['category']
      });
      res.json(categories.map((category) => category.category));
    } catch (err) {
      next(err);
    }
  });
  