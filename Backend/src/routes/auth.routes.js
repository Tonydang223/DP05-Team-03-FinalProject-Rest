const express = require('express');
const AuthController = require('../controller/AuthController');
const { userAuthPermission } = require('../middlewares/auth')
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/changePassword', userAuthPermission(), AuthController.changePassword);

module.exports = router;
