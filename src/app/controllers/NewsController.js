const Post = require('../models/Post');
const { multiMongooseToObj }  = require('../../utils/mongoose');
class NewsController {

    ///GET
    index(req, res, next) {
        Post.find({})
            .then( posts =>  {
                res.render('news' , 
                {
                    posts: multiMongooseToObj(posts)
                });
            })
            .catch(next);
           
        }
    } 
module.exports = new NewsController();