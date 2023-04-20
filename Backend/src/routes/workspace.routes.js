const express = require('express');
const { userAuthPermission } = require('../middlewares/auth');
const { ROLES } = require('../config/constants');
const SpaceController = require('../controller/SpaceController');
const router = express.Router();

router.post('/create', userAuthPermission([ROLES[0]]), SpaceController.create);
router.post('/update/:id', userAuthPermission([ROLES[0]]), SpaceController.update);
router.post('/changeStatus/:id', userAuthPermission([ROLES[0]]), SpaceController.changeStatus);

module.exports = router;
