const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { multiMongooseToObj, mongooseToObj } = require('../../utils/mongoose');
class ContactController {

    newsPost(req, res, next) {
        let sesh = req.session;
        const userId = sesh.userLogin._id;
        console.log(userId);
        res.render('new-post-forum',
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
        const title = req.body.title;
        const sumary = req.body.sumary;
        const content = req.body.content;
        const image = req.body.image;
        const userId = sesh.userLogin._id;
        const newPost = new Post({
            title: title,
            sumary: sumary,
            content: content,
            image: image,
            userId: userId,
        });
        newPost.save()
            .then(() => res.redirect('/forum'))
            .catch(error => {
            });
    }
    ///GET

    // Comment(req, res, next) {

    // }
    show(req, res, next) {
        let sesh = req.session;
        if (!sesh.loggedIn) {
            // Người dùng chưa đăng nhập, chuyển hướng về trang đăng nhập hoặc hiển thị thông báo lỗi
            return res.render('login', { title: 'Login', error: 'You need to login first.' });
        }
        const comment = req.body.comment;
        const userId = sesh.userLogin._id;
        const postId = req.params.id;

        const newComment = new Comment({
            content: comment,
            userId: userId,
            postId: postId,
        });

        newComment.save()
            .then((savedComment) => {
                // Lưu id_comment trong Post.comment
                return Post.findOneAndUpdate(
                    { _id: postId },
                    { $push: { Comment: savedComment._id } },
                    { new: true }
                );
            })
            .then((updatedPost) => {
                // Điều hướng đến trang chi tiết bài viết
                res.redirect('/forum/' + postId);
            })
            .catch(error => {
                console.log(error);
                // Xử lý lỗi nếu cần
            });

        Post.findOne({ _id: postId })
            .populate('userId')
            .populate('Comment') // Sửa đổi tên thuộc tính tại đây nếu cần
            .then((post) => {
                console.log(post);
                res.render('post-forum', {
                    post: mongooseToObj(post),
                    loggedIn: sesh.loggedIn,
                    userLogin: sesh.userLogin,
                });
            })
            .catch(next);
    }



    index(req, res, next) {
        let sesh = req.session;
        Post.find({})
            .populate('userId') // Lấy thông tin người dùng từ reference field 'userId'
            .then(posts => {
                res.render('forum', {
                    posts: multiMongooseToObj(posts),
                    loggedIn: sesh.loggedIn,
                    userLogin: sesh.userLogin,
                });
            })
            .catch(next);
    }
}
module.exports = new ContactController();