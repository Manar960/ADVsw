const express = require('express');
const router = express.Router();
const imageController = require('../controller/data.image');


router.post('/', imageController.createImage);
router.get('/:imageid', imageController.getImage);
router.get('/user/:userid/images', imageController.getAllUserImages); 
router.delete('/:imageid', imageController.deleteImage);

module.exports = router;
