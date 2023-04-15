const express = require('express');
const WorkspaceController = require('../controller/\bWorkspaceController');
const { userAuthPermission } = require('../middlewares/auth');
const { ROLES } = require('../config/constants');
const router = express.Router();

router.post('/create', userAuthPermission([ROLES[0]]), WorkspaceController.create);
router.post('/update/:id', userAuthPermission([ROLES[0]]), WorkspaceController.update);
router.post('/changeStatus/:id', userAuthPermission([ROLES[0]]), WorkspaceController.changeStatus);

module.exports = router;
