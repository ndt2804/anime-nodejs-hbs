class NewsController {


    ///GET
    index(req, res) {
        res.render('News');

    }
} 

module.exports = new NewsController;