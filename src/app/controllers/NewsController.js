const New = require('../models/New');
const { multiMongooseToObj, mongooseToObj } = require('../../utils/mongoose');
class NewsController {

    newsPost(req, res, next) {
        let sesh = req.session;
        const userId = sesh.userLogin._id;
        console.log(userId);
        res.render('new-post',
            {
                loggedIn: sesh.loggedIn,
                userLogin: sesh.userLogin,
            });
    };

    newPost(req, res) {
        let sesh = req.session;
        if (!sesh.loggedIn) {
            // Người dùng chưa đăng nhập, chuyển hướng về trang đăng nhập hoặc hiển thị thông báo lỗi
            return res.render('login', { title: 'Login', error: 'You need to login first.' });
        }
        console.log(req.body);
        const title = req.body.title;
        const content = req.body.content;
        const image = req.body.image;
        const userId = sesh.userLogin._id;
        const newPost = new New({
            title: title,
            content: content,
            image: image,
            userId: userId,
        });
        newPost.save()
            .then(() => res.redirect('/news'))
            .catch(error => {
            });
    }
    ///GET
    show(req, res, next) {
        let sesh = req.session;
        console.log(req.params);
        New.findOne({ _id: req.params.id })
            .populate('userId')
            .then((post) => {
                // res.json(post);
                res.render('post-news', {
                    post: mongooseToObj(post),
                    loggedIn: sesh.loggedIn,
                    userLogin: sesh.userLogin,
                });
            })
            .catch(next);
    }
    index(req, res, next) {
        let sesh = req.session;
        New.find({})
            .populate('userId') // Lấy thông tin người dùng từ reference field 'userId'
            .then(posts => {
                res.render('news', {
                    posts: multiMongooseToObj(posts),
                    loggedIn: sesh.loggedIn,
                    userLogin: sesh.userLogin,
                });
            })
            .catch(next);
    }

}
module.exports = new NewsController();