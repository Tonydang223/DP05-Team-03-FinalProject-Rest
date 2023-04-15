const express = require('express');
const { userAuthPermission } = require('../middlewares/auth');
const { ROLES } = require('../config/constants');
const GroupController = require('../controller/GroupController');
const router = express.Router();

router.post('/create', userAuthPermission([ROLES[1]]), GroupController.create);
router.post('/addMembers/:id', userAuthPermission([ROLES[1]]), GroupController.addMembers);
router.post('/update/:id', userAuthPermission([ROLES[1]]), GroupController.update);

module.exports = router;
