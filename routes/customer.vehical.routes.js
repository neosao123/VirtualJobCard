const router = require("express").Router();
const customerVehicalController = require("../controllers/customer.vehical.controller");
const auth = require("../middlewares/auth");

router.post('/create', auth, customerVehicalController.create);
router.post('/delete', auth, customerVehicalController.delete);
router.post('/update', auth, customerVehicalController.update);
router.post('/getInfo', auth, customerVehicalController.getInfo); // by registered vehical number
router.get('/truncate', auth, customerVehicalController.truncate);

module.exports = router;







