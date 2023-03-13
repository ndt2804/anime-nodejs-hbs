const express = require('express');
const router = express.Router();
const forumController = require('../app/controllers/ForumController')

router.use('/', forumController.index);

module.exports = router;