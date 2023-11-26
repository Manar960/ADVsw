const express = require('express');
const router = express.Router(); 
const messageController = require('../controller/messagecontroller');
const authMiddleware = require('../middleware/autho')

router.use(authMiddleware);
router.post('/send', messageController.sendmessages);
router.get('/:user_id', messageController.receivemessages);


module.exports = router; 
