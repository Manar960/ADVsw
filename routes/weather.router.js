const express = require('express');
const router = express.Router();
const weatherController = require('../controller/withar.api');

router.get('/forecast/:latitude/:longitude', weatherController.getWeatherForecast);

module.exports = router;
