const express = require('express');
const router = express.Router({mergeParams: true });
const episodeController = require('../app/controllers/EpisodeController')


router.get('/:slug',episodeController.show);





module.exports = router;