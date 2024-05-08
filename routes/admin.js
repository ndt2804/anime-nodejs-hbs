const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController')

router.get('/', adminController.index);
router.get('/animes', adminController.showAnime);
router.get('/animes/:slug', adminController.showAnimeSlug);
router.get('/post', adminController.PostAnime);



module.exports = router;