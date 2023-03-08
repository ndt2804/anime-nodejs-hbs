const Episodes = require('../models/Episodes.js');
const Anime = require('../models/Anime.js');
const { mongooseToObj }  = require('../../utils/mongoose');
const { multiMongooseToObj }  = require('../../utils/mongoose');
class EpisodeController {

    ///GET
    // show(req, res, next) {
    //     Episodes.findOne({})
    //        .then((episodes) => {   
    //        //  res.json(episodes)
    //             res.render('animes/episodes', {episodes: multiMongooseToObj(episodes) });   
    //    })
    //         .catch(next);
    // }
    show(req, res, next) {
        Episodes.find({slug: req.params.slug})
        .then((episodes) => {
            res.render('animes/episodes', {episodes: multiMongooseToObj(episodes) });   
        })
    }
   
    

    // show(req,res) {
    //     res.send('TEST');
    // }
 }
module.exports = new EpisodeController;