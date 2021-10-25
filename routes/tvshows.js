var express = require('express');
var router = express.Router();
const tvshowsCtrl = require('../controllers/tvshows');

router.get('/popular', tvshowsCtrl.tvPopular);
router.get('/:id', tvshowsCtrl.show);

module.exports = router;