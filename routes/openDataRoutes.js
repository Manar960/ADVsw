
const express = require('express');
const router = express.Router();
const openDataController = require('../controller/openData.controller');
const authMiddleware = require('../middleware/autho')

router.use(authMiddleware);
router.get('/environmentData', openDataController.getAllEnvironmentData);
router.get('/environmentData/:location', openDataController.getEnvironmentDataByLocation);
router.get('/data/nameAndNote', openDataController.getEnvironmentDataByNameAndNote);
router.get('/analysis', openDataController.analyzeEnvironmentDataAPI);

module.exports = router;
