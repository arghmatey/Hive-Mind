var router = require('express').Router();
var usersCtrl = require('../controllers/users')

router.get('/users/:id', usersCtrl.show)

module.exports = router;
