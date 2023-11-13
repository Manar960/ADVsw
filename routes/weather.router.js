const express = require('express');
const router = express.Router();
const weatherController = require('../controller/withar.api');
const authMiddleware = require('../middleware/autho')
router.use(authMiddleware);

router.get('/forecast/:latitude/:longitude', weatherController.getWeatherForecast);

module.exports = router;
