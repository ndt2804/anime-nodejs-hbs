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
    video(req, res, next) {
        let sesh = req.session;
        let pageData = {};
        // Lấy thông tin của video đang xem
        Anime.findOne({ slug: req.params.slug })
            .populate('episodes')
            .then((anime) => {
                pageData.anime = mongooseToObj(anime);

                // Lấy thông tin của các video được đề xuất
                Anime.find({ _id: { $ne: anime._id }, genres: { $in: anime.genres } })
                    .then((recommendations) => {
                        // Đếm số lượng thể loại chung và lưu vào mảng chungCount
                        const chungCount = recommendations.map((video) => {
                            const commonGenres = video.genres.filter((genre) => anime.genres.includes(genre));
                            return { video: video, count: commonGenres.length };
                        });
                        // Sắp xếp danh sách các video dựa trên số lượng thể loại chung
                        chungCount.sort((a, b) => b.count - a.count);
                        // Lấy ra 5 video đề xuất có số lượng thể loại chung lớn nhất
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


    updateRating(req, res, next) {
        const sesh = req.session;
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!sesh.loggedIn) {
            return res.status(401).json({ message: 'Bạn cần đăng nhập để đánh giá.' });
        }
        const animeId = req.body.animeId;
        const rating = parseFloat(req.body.rating);

        Rate.findOne({ animeId, userId: sesh.userId })
            .then((ratingData) => {
                if (!ratingData) {
                    // Tạo mới thông tin rating nếu chưa tồn tại
                    ratingData = new Rate({
                        animeId,
                        userId: sesh.userId,
                        rating,
                        numRates: 1
                    });
                } else {
                    // Cập nhật thông tin rating nếu đã tồn tại
                    ratingData.rating = rating;
                    ratingData.numRates += 1;
                }

                return ratingData.save();
            })
            .then((savedRating) => {
                // Tính toán rating trung bình
                const averageRating = savedRating.rating / savedRating.numRates;

                res.json({ message: 'Đã cập nhật rating thành công', rating: averageRating });
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