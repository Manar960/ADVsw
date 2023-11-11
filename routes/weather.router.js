
const express = require('express');
const router = express.Router();
const weatherController = require('../controller/withar.api');

router.get('/getWeatherData', weatherController.getWeatherForecast);

module.exports = router;
