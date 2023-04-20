const express = require('express');
const userRoute = require('./user.routes');
const workspaceRoute = require('./workspace.routes');
const authRoute = require('./auth.routes');
const groupRoute = require('../routes/group.routes');
const requestRoute = require('../routes/request.routes');
const apiRoute = express.Router();

apiRoute.use('/user', userRoute);
apiRoute.use('/workspace', workspaceRoute);
apiRoute.use('/auth', authRoute);
apiRoute.use('/group', groupRoute);
apiRoute.use('/request', requestRoute);

module.exports = apiRoute;
