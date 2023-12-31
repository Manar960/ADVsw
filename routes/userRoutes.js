const express = require('express');
const router = express.Router(); 
const userController = require('../controller/userController');
router.post('/', userController.createUser);
router.get('/search', userController.searchUsers);
router.get('/:userId', userController.getUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.post('/login', userController.login); 
//router.get('/logout', userController.logout);
module.exports = router; 
