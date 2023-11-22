const express = require('express');
const routerS = express.Router(); 
const authMiddleware = require('../middleware/autho')
routerS.use(authMiddleware);
const edexternalAPIcont = require('../controller/edexternalAPIcont');
routerS.get('/climateNews', edexternalAPIcont.getClimateNews);
routerS.get('/:newArticles', edexternalAPIcont.getAllNewsArticles);
routerS.get('/:newpublisher', edexternalAPIcont.getNewsPublishers);

module.exports = routerS; 
