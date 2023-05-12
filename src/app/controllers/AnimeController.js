const Anime = require('../models/Anime.js');
const Episodes = require('../models/Episodes.js');
const { mongooseToObj }  = require('../../utils/mongoose');
const {multiMongooseToObj} = require('../../utils/mongoose');
class AnimeController {
    ///GET
    show(req, res, next) {
        let sesh = req.session;

        Anime.find({})
            .then( animes =>  {
                res.render('animes/anime' , 
                {
                    animes: multiMongooseToObj(animes),
                    loggedIn:sesh.loggedIn, 
                    userLogin:sesh.userLogin,
                });
            })
            .catch(next);   
        }

    //     recommend(req, res, next) {
    //         let sesh = req.session;
    //         Anime.find({})
    //             .then( animes =>  {
    //                 res.render('animes/animes' , 
    //                 {
    //                     animes: multiMongooseToObj(animes),
    //                     loggedIn:sesh.loggedIn, 
    //                     userLogin:sesh.userLogin,
    //                 });
    //             })
    //             .catch(next);   
    //         }
            
    // index(req, res, next) {
    //     let sesh = req.session;

    //     Anime.findOne({ slug: req.params.slug})
    //         .populate('episodes')    
    //         .then((anime) => {
    //             res.render('animes/animes', {
    //                 anime : mongooseToObj(anime),
    //                 loggedIn:sesh.loggedIn, 
    //                 userLogin:sesh.userLogin,
    //             });     
    //         })
    //     .catch(next);
    // }

    video(req, res, next) {
        let sesh = req.session;
        let pageData = {};
        // Lấy thông tin của video đang xem
        Anime.findOne({ slug: req.params.slug})
            .populate('episodes')    
            .then((anime) => {
                pageData.anime = mongooseToObj(anime);
                
                // Lấy thông tin của các video được đề xuất
                Anime.find({ genres: anime.genres, _id: { $ne: anime._id }})
                    .limit(5)
                    .then((recommendations) => {
                        pageData.recommendations = multiMongooseToObj(recommendations);
                        res.render('animes/animes', {
                            pageData: pageData,
                            loggedIn: sesh.loggedIn, 
                            userLogin: sesh.userLogin,
                        });
                    })
                    .catch(next);
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