const express = require('express');
const router = express.Router(); 
const messageController = require('../controller/messagecontroller');
router.post('/send', messageController.sendmessages);
router.get('/:user_id', messageController.receivemessages);

module.exports = router; 
