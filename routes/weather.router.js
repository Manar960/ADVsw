const express = require('express');
const router = express.Router();
const weatherController = require('../controller/withar.api');



router.get('/forecast', weatherController.getWeatherForecast);
//router.get('/forecastm', weatherController.getWeatherForecastM);


module.exports = router;
