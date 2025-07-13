const router = require("express").Router();
const reportsCtrl = require("../controllers/reports");

router.post("/reports/:id", reportsCtrl.create);

module.exports = router;
