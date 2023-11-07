const express = require('express');
const routerR = express.Router();
const reportController = require('../controller/repoet.controller');

routerR.post('/', reportController.createReports);
routerR.get('/:reportid', reportController.getReports);
routerR.put('/:reportid', reportController.updateReports);
routerR.delete('/:reportid', reportController.deleteReports);
routerR.get('/user/:userid', reportController.getReportsByUserID);

module.exports = routerR;
