const newsRouter = require('./news');
const homeRouter = require('./home');
const contactRouter = require('./contact');
const animesRouter = require('./animes');
function route(app) {
    app.use('/news', newsRouter);
    app.use('/anime', animesRouter);
    app.use('/contact', contactRouter);
    app.use('/search', (req, res) => {
      res.render('search');
    })
    app.use('/', homeRouter);
    

}


module.exports = route;
