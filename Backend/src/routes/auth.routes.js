const express = require('express');
const AuthController = require('../controller/AuthController');
const { userAuthPermission } = require('../middlewares/auth');
const { ROLES } = require('../config/constants');
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/resetPassword', userAuthPermission([ROLES[0]]), AuthController.ResetPass);
router.post('/changePassword', userAuthPermission(), AuthController.ChangePass);

module.exports = router;
