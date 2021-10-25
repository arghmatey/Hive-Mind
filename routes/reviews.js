const router = require('express').Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/reviews/:id', reviewsCtrl.create);

module.exports = router;