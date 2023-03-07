const newsRouter = require('./news');
const homeRouter = require('./home');
const animeRouter = require('./animes');
const episodeRouter = require('./episodes');
function route(app) {
    // app.get('/', (req, res) => {
    //     res.render('home');
    // });

    app.use('/news', newsRouter);
    app.use('/anime', animeRouter);
    app.use('/anime/:slug', episodeRouter);
    app.use('/search', (req, res) => {
      res.render('search');
    })
    app.use('/', homeRouter);
    

}


module.exports = route;
