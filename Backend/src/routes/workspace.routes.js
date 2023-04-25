const express = require('express');
const { userAuthPermission } = require('../middlewares/auth');
const { ROLES } = require('../config/constants');
const SpaceController = require('../controller/SpaceController');
const router = express.Router();

router.post('/create', userAuthPermission([ROLES[0]]), SpaceController.create);
router.post('/update/:id', userAuthPermission([ROLES[0]]), SpaceController.update);
router.post('/changeStatus/:id', userAuthPermission([ROLES[0]]), SpaceController.changeStatus);
router.get('/getAll', userAuthPermission(), SpaceController.getWorkspaces);
router.get('/getDetail/:id', userAuthPermission(), SpaceController.getDetailWorkspace);

module.exports = router;
