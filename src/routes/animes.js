const express = require('express');
const router = express.Router();
const animeController = require('../app/controllers/AnimeController')

router.get('/', animeController.show);
router.get('/create', animeController.create);
router.post('/store', animeController.store);
router.get('/createEpisodes', animeController.createEpisodes);
router.post('/storeEp', animeController.storeEp);
router.get('/:slug',  animeController.index, animeController.recommend);






module.exports = router;