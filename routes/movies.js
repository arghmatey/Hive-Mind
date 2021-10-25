var express = require('express');
var router = express.Router();
const moviesCtrl = require('../controllers/movies');

router.get('/movies/popular', moviesCtrl.moviePopular);
router.get('/movies/:id', moviesCtrl.show);

module.exports = router;