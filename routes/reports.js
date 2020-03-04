const router = require('express').Router();
const reportsCtrl = require('../controllers/reports');

router.get('/', reportsCtrl.index);
router.post('/', reportsCtrl.create);
router.delete('/:id', reportsCtrl.delete);
router.put('/:id', reportsCtrl.update);

module.exports = router;