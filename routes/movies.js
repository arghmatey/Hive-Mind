var express = require('express');
var router = express.Router();
const moviesCtrl = require('../controllers/movies');

router.get('/movie', moviesCtrl.movieSearch);

module.exports = router;