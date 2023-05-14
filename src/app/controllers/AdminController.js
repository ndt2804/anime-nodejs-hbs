const Anime = require('../models/Anime.js');
const Post = require('../models/Post');
const { mongooseToObj } = require('../../utils/mongoose');
const { multiMongooseToObj } = require('../../utils/mongoose');
class ContactController {
    ///GET
    index(req, res, next) {
        res.render('admin/homeAdmin', { layout: 'admin' });
    }
    // show(req, res, next) {
    //     res.render('admin/animeAdmin',{ layout: 'admin' });
    // }
    // showAnime(req, res, next) {
    showAnime(req, res, next) {
        Anime.find({})
            .then(animes => {
                const data = {
                    animes: multiMongooseToObj(animes)
                };
                res.render('admin/animeAdmin', {
                    layout: 'admin',
                    data: data
                });
            })
            .catch(error => {
                console.log(error);
                next(error);
            });
    }
    showAnimeSlug(req, res, next) {
        Anime.findOne({ slug: req.params.slug })
            .populate('episodes')
            .then(animes => {
                const data = {
                    animes: mongooseToObj(animes)
                };
                res.json(data);
                // res.render('admin/animeAdmin', {
                //     layout: 'admin',
                //     data: data
                // });
            })
            .catch(error => {
                console.log(error);
                next(error);
            });
    }
    PostAnime(req, res, next) {
        Post.find({})
            .then(posts => {
                const data = {
                    posts: multiMongooseToObj(posts)
                };
                res.render('admin/postAdmin', {
                    layout: 'admin',
                    data: data
                });
            })
            .catch(error => {
                console.log(error);
                next(error);
            });
    }


}

module.exports = new ContactController();