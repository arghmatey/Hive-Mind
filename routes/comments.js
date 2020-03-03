const router = require('express').Router();
const commentsCtrl = require('../controllers/comments');

router.post('/reports/:id/comments', commentsCtrl.create);

module.exports = router;