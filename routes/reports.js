const router = require('express').Router();
const reportsCtrl = require('../controllers/reports');

router.get('/', reportsCtrl.index);
router.get('/all', reportsCtrl.allBooks);
router.post('/', reportsCtrl.create);
router.delete('/:id', reportsCtrl.delete);

module.exports = router;