// environmentalNews.router.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/autho'); 
const environmentalNewsController = require('../controller/environmentalNews.controller'); 


router.use(authMiddleware);

router.get('/news', environmentalNewsController.getClimateNews);

module.exports = router;
