const express = require('express');
const router = express.Router();
const animeController = require('../app/controllers/AnimeController')

router.get('/', animeController.show);
router.get('/create', animeController.create);
router.post('/store', animeController.store);
router.get('/createEpisodes', animeController.createEpisodes);
router.post('/storeEp', animeController.storeEp);
router.get('/:slug', animeController.video);
router.get('/info/:slug', animeController.info);
router.post('/info/:slug', animeController.saveRating);










module.exports = router;