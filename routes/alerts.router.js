const express = require('express');
const router = express.Router();
const alertController = require('../controller/alerts.controller');

router.post('/:user_id/alerts', alertController.setUserAlert);

module.exports = router;
