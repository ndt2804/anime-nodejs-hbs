const Anime = require('../models/Anime.js');
const { multiMongooseToObj }  = require('../../utils/mongoose');
class HomeController {

    ///GET
    index(req, res, next) {
        let sesh = req.session;
        Anime.find({})
            .then( animes =>  {
                res.render('home' , { 
                    animes: multiMongooseToObj(animes), 
                    loggedIn:sesh.loggedIn, 
                    userLogin:sesh.userLogin 
                });
            })
            .catch(next);
           
        }
    } 

   
module.exports = new HomeController;