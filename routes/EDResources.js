const express = require('express');
const router = express.Router(); 
const authMiddleware = require('../middleware/autho')
router.use(authMiddleware);
const EdresourcesController = require('../controller/EDResourcescontroller');
router.get('/', EdresourcesController.getEdresources);
router.get('/search', EdresourcesController.getspecificEdresources);
router.post('/', EdresourcesController.createEdresources);
router.put('/:Id', EdresourcesController.updateEdresources);
router.delete('/:Id', EdresourcesController.deleteEdresources);

module.exports = router; 
