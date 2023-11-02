const express = require('express');
const routerS = express.Router(); 
const dataspurceController = require('../controller/data.source');
routerS.post('/', dataspurceController.createDataSource);
routerS.get('/:sourceid', dataspurceController.getDataSource);
routerS.put('/:sourceid', dataspurceController.updateDataSource);
routerS.delete('/:sourceid', dataspurceController.deleteDataSource);

module.exports = routerS; 
