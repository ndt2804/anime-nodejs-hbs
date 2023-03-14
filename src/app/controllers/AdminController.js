const Anime = require('../models/Anime.js');

const {multiMongooseToObj} = require('../../utils/mongoose');
class ContactController {
    ///GET
    index(req, res, next) {
        res.render('admin/homeAdmin', { layout: 'admin' });
    }
    show(req, res, next) {
        res.render('admin/animeAdmin',{ layout: 'admin' });
    }
    // showAnime(req, res, next) {
    //     Anime.find({})
    //         .then( animes =>  {
    //             res.render('admin/animeAdmin', 
    //             {
    //                 animes: multiMongooseToObj(animes)
    //             },
    //             { layout: 'admin' });
    //         })
    //         .catch(next);
           
    //     }
}
module.exports = new ContactController();