const express = require('express');
const userRoute = require('./user.routes');
const workspaceRoute = require('./workspace.routes');
const authRoute = require('./auth.routes');
const groupModel = require('../routes/group.routes');
const apiRoute = express.Router();

apiRoute.use('/user', userRoute);
apiRoute.use('/workspace', workspaceRoute);
apiRoute.use('/auth', authRoute);
apiRoute.use('/group', groupModel);

module.exports = apiRoute;
