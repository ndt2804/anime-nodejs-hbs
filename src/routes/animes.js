const express = require('express');
const router = express.Router();
const animeController = require('../app/controllers/AnimeController')


router.get('/create', animeController.create);
router.post('/store', animeController.store);
router.get('/:slug',  animeController.index);
// router.get('/:slug/:slug', animeController.show);





module.exports = router;