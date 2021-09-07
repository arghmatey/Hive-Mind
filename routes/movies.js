var express = require('express');
var router = express.Router();
const moviesCtrl = require('../controllers/movies');

router.get('/', moviesCtrl.allPopular);
router.get('/movies/', moviesCtrl.movieSearch);
router.get('/movies/:id', moviesCtrl.show);

module.exports = router;