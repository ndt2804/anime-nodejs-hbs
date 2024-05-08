const Anime = require('../models/Anime.js');
const { multiMongooseToObj } = require('../../utils/mongoose');
class HomeController {

    ///GET
    // index(req, res, next) {
    //     let sesh = req.session;
    //     Anime.find({})
    //         .then(animes => {
    //             res.render('home', {
    //                 animes: multiMongooseToObj(animes),
    //                 loggedIn: sesh.loggedIn,
    //                 userLogin: sesh.userLogin
    //             });
    //         })
    //         .catch(next);

    // }
    index(req, res, next) {
        let sesh = req.session;

        Anime.find({})
            .populate('rating') // Lấy thông tin chi tiết của đối tượng rating
            .then(animes => {
                const allAnimes = multiMongooseToObj(animes);

                // Sắp xếp danh sách anime theo rating giảm dần
                const sortedByRating = allAnimes.slice().sort((a, b) => {
                    if (a.rating && b.rating) {
                        return b.rating.rate - a.rating.rate;
                    } else {
                        // Đặt anime không có rating ở cuối danh sách
                        if (!a.rating) return 1;
                        if (!b.rating) return -1;
                    }
                });

                res.render('home', {
                    animes: allAnimes,
                    sortedByRating: sortedByRating,
                    loggedIn: sesh.loggedIn,
                    userLogin: sesh.userLogin,
                });
            })
            .catch(next);
    }
}


module.exports = new HomeController;