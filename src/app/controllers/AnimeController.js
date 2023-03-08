const Anime = require('../models/Anime.js');
const Episodes = require('../models/Episodes.js');
const { mongooseToObj }  = require('../../utils/mongoose');
class AnimeController {
    ///GET
    index(req, res, next) {
        Anime.findOne({ slug: req.params.slug})
            .populate('episodes')    
            .then((anime) => {
                res.render('animes/animes', {anime : mongooseToObj(anime)}); 
            })
        .catch(next);
    }
    // anime/create 
    create(req, res, next) {
        res.render('animes/create');
    }
    //POST /anime/store
    store(req, res, next) {
        // res.json(req.body);
        const anime = new Anime(req.body);
        anime.save()
            .then(() => res.redirect('/'))
            .catch(error => {
                
            });
        
    }
}
   
module.exports = new AnimeController();