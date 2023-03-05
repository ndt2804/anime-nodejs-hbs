const Anime = require('../models/Anime.js');
const Episodes = require('../models/Episodes.js');
const { mongooseToObj }  = require('../../utils/mongoose');
const { multiMongooseToObj }  = require('../../utils/mongoose');
class AnimeController {
    ///GET
    // index(req, res, next) {
    //     Anime.findOne({ slug: req.params.slug})
    //         .populate('episodes')    
    //         .then((anime) => {
    //             Episodes.find({anime_id: anime._id})
    //             .then((episodes) => {     
    //         res.json(episodes)
    //          // res.render('animes/animes', {anime : mongooseToObj(anime), episodes:multiMongooseToObj(episodes) });   
    //         })
    //         .catch(next);
    //     })
    //     .catch(next);
    // }
    index(req, res, next) {
             Anime.findOne({ slug: req.params.slug})
                .populate('episodes')    
                .then((anime) => {
                Episodes.find({_id: anime.episodes})
                .then((episodes) => {   
                //  res.json(episodes)
            res.render('animes/animes', {anime : mongooseToObj(anime), episodes:multiMongooseToObj(episodes) });   
            })
                 .catch(next);
                })
         .catch(next);
     }

// index(req, res, next) {
//         Episodes.find({ anime_id: "63fdbcb00f751feae8b51b15" })
//             .then((Episodes) => {        
//                 res.json(Episodes);
//                 console.log(req.params.anime_id);
//                 console.log(Episodes.anime_id);

//             })
//             .catch(next);
//     }




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