const User = require('../models/User');
class ProfileController {
    profile(req, res, next) {
        let sesh = req.session;
        console.log(sesh);
        User.findById(sesh.userLogin._id)
            .then(user => {
                if (!user) {
                    // Xử lý khi không tìm thấy người dùng
                    return res.redirect('/login');
                }

                res.render('profile', {
                    // user: user,
                    loggedIn: sesh.loggedIn,
                    userLogin: sesh.userLogin,
                });
            })
            .catch(next);
        // res.render('profile');
    }
}
module.exports = new ProfileController();
