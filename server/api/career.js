const router = require('express').Router();
const { models: { Career }} = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const careers = await Career.findAll();
        res.json(careers);
    } catch (err) {
        next(err);
    }
});

router.get('/:careerId', async (req, res, next) => {
    try {
        const career = await Career.findByPk(req.params.careerId);
        res.send(career);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const career = await Career.create(req.body);
        res.send(career);
    } catch (err) {
        next(err);
    }
});

// router.put("/:Id", async (req, res, next) => {
//     try {
//         const career = await Career.findByPk(req.params.Id);



module.exports = router;