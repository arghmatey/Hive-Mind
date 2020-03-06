const router = require('express').Router();
const commentsCtrl = require('../controllers/comments');

router.post('/reports/:id/comments', commentsCtrl.create);
router.delete('/:rid/comments/:cid', commentsCtrl.delete);

module.exports = router;