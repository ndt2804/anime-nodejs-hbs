const newsRouter = require('./news');
const homeRouter = require('./home');
const contactRouter = require('./contact');
const animesRouter = require('./animes');
const forumRouter = require('./forum');
const adminRouter = require('./admin');

const authRouter = require('./auth')

function route(app) {
    app.use('/news', newsRouter);
    app.use('/anime', animesRouter);
    app.use('/contact', contactRouter);
    app.use('/forum', forumRouter);
    app.use('/admin', adminRouter);

    app.use('/auth', authRouter);
    app.use('/search', (req, res) => {
      res.render('search');
    })
    app.use('/', homeRouter);
    
    

}


module.exports = route;
