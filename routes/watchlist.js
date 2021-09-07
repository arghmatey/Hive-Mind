var express = require('express');
var router = express.Router();
const watchlistCtrl = require('../controllers/watchlist');

router.post('/users/:uid/movie/:mid', watchlistCtrl.create);
router.delete('/users/:uid/movie/:mid', watchlistCtrl.delete);

module.exports = router;