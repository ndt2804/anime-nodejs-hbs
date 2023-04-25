const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getSignup = (req, res) => {
  res.render('register');
};

exports.postSignup = async (req, res) => {
    try {
      const { username, password, mail } = req.body;
      const user = await User.findOne({ mail });
      if (user) {
        return res.render('register', {
          message: 'Email đã được đăng ký'
        });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        password: hashedPassword,
        mail,
      });
      await newUser.save();
      res.render('login', {
        message: 'Đăng ký thành công. Vui lòng đăng nhập'
      });
    } catch (err) {
      console.log(err);
      res.render('register', {
        message: 'Có lỗi xảy ra, vui lòng thử lại'
      });
    }
  };
  

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
  const { mail, password } = req.body;
  const user = await User.findOne({ mail });
  if (!user) {
    return res.redirect('/login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.redirect('/login');
  }
  req.session.user = user;
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
