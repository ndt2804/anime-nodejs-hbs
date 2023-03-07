const Anime = require('../models/Anime.js');
const { multiMongooseToObj }  = require('../../utils/mongoose');
class NewsController {

    ///GET
    index(req, res, next) {
        Anime.find({})
            .then( animes =>  {
                res.render('news' , 
                {
                    animes: multiMongooseToObj(animes)
                });
            })
            .catch(next);
           
        }
    } 
module.exports = new NewsController();