const newsRouter = require('./news');
const homeRouter = require('./home');
const contactRouter = require('./contact');
const animesRouter = require('./animes');
const forumRouter = require('./forum');
const adminRouter = require('./admin');
const loginRouter = require('./login');

const authRouter = require('./auth')

function route(app) {
  app.use('/forum', forumRouter);
  app.use('/news', newsRouter);
  app.use('/anime', animesRouter);
  app.use('/contact', contactRouter);
  app.use('/admin', adminRouter);
  app.use('/login', loginRouter);
  app.use('/auth', authRouter);
  app.use('/search', (req, res) => {
    res.render('search');
  })
  app.use('/', homeRouter);



}


module.exports = route;
