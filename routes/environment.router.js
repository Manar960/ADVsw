const express = require('express');
const router = express.Router();
const environmentController = require('../controller/environment.data.controller');


router.post('/', environmentController.createEnvironment);

router.get('/:dataid', environmentController.getEnvironment);

router.put('/:dataid', environmentController.updateEnvironment);

router.delete('/:dataid', environmentController.deleteEnvironment);

router.put('/updateScore/:userId', environmentController.updateScore);

router.put('/:dataId/reportFake', environmentController.updateReportFake);

module.exports = router;
