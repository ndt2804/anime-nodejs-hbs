const Anime = require('../models/Anime.js');
const { multiMongooseToObj }  = require('../../utils/mongoose');
class HomeController {

    ///GET
    index(req, res, next) {
        Anime.find({})
            .then( animes =>  {
                res.render('home' , {animes: multiMongooseToObj(animes)});
            })
            .catch(next);
           
        }
    } 

   
module.exports = new HomeController;