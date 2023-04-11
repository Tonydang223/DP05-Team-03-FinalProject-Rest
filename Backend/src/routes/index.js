const express = require('express');
const userRoute = require('./user')
const apiRoute = express.Router();

apiRoute.use('/user', userRoute);

module.exports = apiRoute;