const express = require('express');
const router = express.Router();
const alertController = require('../controller/alerts.controller');

router.post('/:user_id/alerts', alertController.setUserAlert);
router.put('/:user_id/alerts/:environment_id', alertController.updateUserAlert);
router.delete('/:user_id/alerts/:environment_id', alertController.deleteUserAlert);
router.put('/environment/:id', alertController.updateEnvironmentValue);

module.exports = router;
