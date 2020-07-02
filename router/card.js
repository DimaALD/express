const {Router} = require('express');
const { route } = require('./add');
const Card = require('../models/card');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res, next) => {
    const card = await Card.fetch();
    res.render('card', {
        title: 'Card',
        courses: card.courses,
        price: card.price,
        isCard: true,
    });
});

router.post('/add', async (req, res, next) => {
    const course = await Course.getById(req.body.id);
    await Card.add(course);
    res.redirect('/card');
});

module.exports = router;