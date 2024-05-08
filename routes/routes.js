const newsRouter = require('./news');
const homeRouter = require('./home');
const contactRouter = require('./contact');
const animesRouter = require('./animes');
const forumRouter = require('./forum');
const adminRouter = require('./admin');
const loginRouter = require('./login');
const profileRouter = require('./profile');
const authRouter = require('./auth')

function route(app) {
  app.use('/forum', forumRouter);
  app.use('/news', newsRouter);
  app.use('/anime', animesRouter);
  app.use('/contact', contactRouter);
  app.use('/admin', adminRouter);
  app.use('/login', loginRouter);
  app.use('/profile', profileRouter)
  app.use('/logout', (req, res) => {
    // Xóa session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        // Đăng xuất thành công, chuyển hướng về trang đăng nhập hoặc trang chính
        res.redirect('/login'); // Đổi '/login' thành đường dẫn mong muốn
      }
    });
  });
  // app.use('/auth', authRouter);
  app.use('/search', (req, res) => {
    res.render('search');
  })
  app.use('/', homeRouter);



}


module.exports = route;
