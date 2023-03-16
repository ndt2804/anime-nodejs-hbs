const Anime = require('../models/Anime.js');
const Episodes = require('../models/Episodes.js');
const { mongooseToObj }  = require('../../utils/mongoose');
const {multiMongooseToObj} = require('../../utils/mongoose');
class AnimeController {
    ///GET
    show(req, res, next) {
        Anime.find({})
            .then( animes =>  {
                res.render('animes/anime' , 
                {
                    animes: multiMongooseToObj(animes)
                });
            })
            .catch(next);   
        }
    
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
    
    createEpisodes(req, res, next) {
        Anime.find({})
        .then( animes =>  {
            res.render('animes/createEpisodes' , {animes: multiMongooseToObj(animes)});
        })
        .catch(next);
       
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
    async  storeEp(req, res, next) {
        try {
          const { _id, ...episodeData } = req.body;
          const episodes = await Episodes.create(episodeData);
          await Anime.findByIdAndUpdate(
            _id,
            { $push: { episodes: episodes._id } },
            { new: true }
          );
          res.redirect('/');    
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
    }
   

}
   
module.exports = new AnimeController();