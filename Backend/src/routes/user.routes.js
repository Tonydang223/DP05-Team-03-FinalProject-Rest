const express = require('express');
const UserController = require('../controller/UserController');
const upload = require('../utils/multer');
const { userAuthPermission } = require('../middlewares/auth');
const { ROLES } = require('../config/constants');
const router = express.Router();

router.post('/update', userAuthPermission(), upload.single('avatar'), UserController.updateProfile);
router.post('/create/:id', userAuthPermission([ROLES[0], ROLES[1]]), UserController.createUser);
router.post('/delete/:id', userAuthPermission([ROLES[0]]), UserController.deleteUser);
router.get('/getProfile', userAuthPermission(), UserController.getProfile);

module.exports = router;
