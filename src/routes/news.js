const express = require('express');
const router = express.Router();
const newsController = require('../app/controllers/NewsController')

router.get('/new-post', newsController.newsPost);
router.post('/new-post', newsController.newPost);
router.use('/:id', newsController.show);
router.use('/', newsController.index);

module.exports = router;