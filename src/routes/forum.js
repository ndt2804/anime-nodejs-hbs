const express = require('express');
const router = express.Router();
const forumController = require('../app/controllers/ForumController')

router.get('/new-post-forum', forumController.newsPost);
router.post('/new-post-forum', forumController.newPost);
router.use('/:id', forumController.show);
// router.post('/:id', forumController.Comment);
// router.get('/:id', forumController.Comment);


router.use('/', forumController.index);
module.exports = router;