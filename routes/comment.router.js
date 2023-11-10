const express = require('express');
const routerC = express.Router();
const commentController = require('../controller/comment.controller');


routerC.post('/', commentController.createComment);
routerC.get('/:commentid', commentController.getComment);
routerC.put('/:commentid', commentController.updateComment);
routerC.delete('/:commentid', commentController.deleteComment);
routerC.get('/comments/user/:username', commentController.getCommentsByUserName);
routerC.get('/comments/report/:reportid', commentController.getCommentsForReport);

module.exports = routerC;
