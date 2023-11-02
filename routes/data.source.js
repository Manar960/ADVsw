const express = require('express');
const router = express.Router(); 
const dataspurceController = require('../controller/data.source');
router.post('/', dataspurceController.createDataSource);
router.get('/:sourceid', dataspurceController.getDataSource);
router.put('/:sourceid', dataspurceController.updateDataSource);
router.delete('/:sourceid', dataspurceController.deleteDataSource);

module.exports = router; 
