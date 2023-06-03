const Anime = require('../models/Anime.js');
const Episodes = require('../models/Episodes.js');

const Rate = require('../models/Rating.js');
const { mongooseToObj } = require('../../utils/mongoose');
const { multiMongooseToObj } = require('../../utils/mongoose');
class AnimeController {
    ///GET
    show(req, res, next) {
        let sesh = req.session;

        Anime.find({})
            .then(animes => {
                res.render('animes/anime',
                    {
                        animes: multiMongooseToObj(animes),
                        loggedIn: sesh.loggedIn,
                        userLogin: sesh.userLogin,
                    });
            })
            .catch(next);
    }
    info(req, res, next) {
        let sesh = req.session;
        Anime.findOne({ slug: req.params.slug })
            .populate('rating')
            .then((anime) => {
                // res.json(anime);
                res.render('animes/animeInfo', {
                    animes: mongooseToObj(anime),
                    loggedIn: sesh.loggedIn,
                    userLogin: sesh.userLogin,
                });
            })
            .catch(next);
    }
    saveRating = (req, res, next) => {
        Anime.findOne({ slug: req.params.slug })
            .then((anime) => {
                const ratingValue = req.body.rating; // Lấy giá trị đánh giá từ body request

                // Tìm hoặc tạo một đối tượng Rating cho anime
                Rate.findOne({ animeId: anime._id })
                    .then((rating) => {
                        if (rating) {
                            // Nếu đã tồn tại Rating, cập nhật giá trị và số lượt đánh giá
                            rating.sumRate = parseInt(rating.sumRate) + parseInt(ratingValue);
                            rating.count += 1;
                            rating.rate = parseInt(rating.sumRate) / parseInt(rating.count);

                        } else {
                            // Nếu chưa tồn tại Rating, tạo mới đối tượng Rating
                            rating = new Rate({
                                animeId: anime._id,
                                sumRate: ratingValue,
                                rate: ratingValue,
                                count: 1
                            });
                        }
                        return rating.save();
                    })
                    .then((savedRating) => {
                        // Cập nhật rating trong bảng Anime
                        Anime.findOneAndUpdate({ slug: req.params.slug }, { rating: savedRating._id }, { new: true })
                            .then(() => {
                                // Xử lý thành công
                                res.redirect('/success');
                            })
                            .catch((error) => {
                                // Xử lý lỗi
                                console.error(error);
                                res.redirect('/error');
                            });
                    })
                    .catch(next);
            });
    }

    video(req, res, next) {
        let sesh = req.session;
        let pageData = {};
        // Lấy thông tin của video đang xem
        Anime.findOne({ slug: req.params.slug })
            .populate('episodes')
            .populate('rating')
            .then((anime) => {
                pageData.anime = mongooseToObj(anime);

                // Lấy thông tin của các video được đề xuất
                Anime.find({ _id: { $ne: anime._id }, genres: { $in: anime.genres } })
                    .populate('rating')
                    .then((recommendations) => {
                        // Đếm số lượng thể loại chung và lưu vào mảng chungCount
                        const chungCount = recommendations.map((video) => {
                            const commonGenres = video.genres.filter((genre) => anime.genres.includes(genre));
                            return { video: video, count: commonGenres.length };
                        });
                        // Sắp xếp danh sách các video dựa trên số lượng thể loại chung và rating
                        chungCount.sort((a, b) => {
                            // Sắp xếp theo số lượng thể loại chung giảm dần
                            if (a.count !== b.count) {
                                return b.count - a.count;
                            } else {
                                // Sắp xếp theo rating giảm dần nếu cùng có số lượng thể loại chung
                                if (a.video.rating && b.video.rating) {
                                    return b.video.rating.rate - a.video.rating.rate;
                                } else {
                                    // Đặt video không có rating ở cuối danh sách
                                    if (!a.video.rating) return 1;
                                    if (!b.video.rating) return -1;
                                }
                            }
                        });
                        // Lấy ra 5 video đề xuất có số lượng thể loại chung lớn nhất và rating cao nhất
                        const recommendedVideos = chungCount.slice(0, 5).map((item) => item.video);

                        pageData.recommendations = multiMongooseToObj(recommendedVideos);
                        res.render('animes/animes', {
                            pageData: pageData,
                            loggedIn: sesh.loggedIn,
                            userLogin: sesh.userLogin,
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    }
    // anime/create 
    create(req, res, next) {
        res.render('animes/create');
    }

    createEpisodes(req, res, next) {
        Anime.find({})
            .then(animes => {
                res.render('animes/createEpisodes', { animes: multiMongooseToObj(animes) });
            })
            .catch(next);

    }


    //POST /anime/store
    store(req, res, next) {
        // res.json(req.body);
        const anime = new Anime(req.body);
        anime.save()
            .then(() => res.redirect('/'))
            .catch(error => {
            });

    }
    async storeEp(req, res, next) {
        try {
            const { _id, ...episodeData } = req.body;
            const episodes = await Episodes.create(episodeData);
            await Anime.findByIdAndUpdate(
                _id,
                { $push: { episodes: episodes._id } },
                { new: true }
            );
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }


}

module.exports = new AnimeController();