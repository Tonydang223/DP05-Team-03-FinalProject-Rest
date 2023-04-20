const express = require('express');
const { userAuthPermission } = require('../middlewares/auth');
const RequestController = require('../controller/RequestController');
const { ROLES } = require('../config/constants');
const router = express.Router();

router.post('/create', userAuthPermission([ROLES[2]]), RequestController.createRequest);
router.post('/update/:id', userAuthPermission([ROLES[2]]), RequestController.updateRequest);
router.post('/approve/:id', userAuthPermission([ROLES[2]]), RequestController.aprroveRequest);
router.post('/revert/:id', userAuthPermission([ROLES[2]]), RequestController.revertRequest);
router.get('/status/:id', userAuthPermission(), RequestController.checkStatusRequest);

module.exports = router;
