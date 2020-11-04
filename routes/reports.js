const router = require('express').Router();
const reports = require('../controllers/reports');
const reportsCtrl = require('../controllers/reports');

router.get('/', reportsCtrl.index);
router.get('/new/:id', reportsCtrl.new);
router.post('/', reportsCtrl.create);
router.delete('/:id', reportsCtrl.delete);
router.put('/:id', reportsCtrl.update);

module.exports = router;