var express = require('express');
var router = express.Router();
const moviesCtrl = require('../controllers/movies');

router.get('/', moviesCtrl.movieSearch);
router.get('/:id', moviesCtrl.show)

module.exports = router;