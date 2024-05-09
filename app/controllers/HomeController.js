const Anime = require("../models/Anime.js");
const Episodes = require("../models/Episodes.js");
const { multiMongooseToObj, mongooseToObj } = require("../../utils/mongoose");
class HomeController {
  showAnime(req, res, next) {
    const sesh = req.session;
    // Tìm tất cả các anime và lấy thông tin liên quan
    Anime.find({})
      .populate("episodes") // Lấy thông tin về các tập phim
      .populate("rating") // Lấy thông tin về rating
      .then(async (animes) => {
        // Chuyển đổi dữ liệu từ Mongoose sang đối tượng JavaScript
        const allAnimes = multiMongooseToObj(animes);
        // Lọc ra các anime có tập mới nhất
        const latestAnimes = allAnimes.filter(
          (anime) => anime.episodes.length > 0
        );
        // Lấy thông tin về tập mới nhất của từng anime
        const latestAnimeWithEpisodes = await Promise.all(
          latestAnimes.map(async (anime) => {
            // Lấy tập mới nhất của anime từ cơ sở dữ liệu
            const latestEpisode = await Episodes.findOne({
              _id: { $in: anime.episodes },
            })
              .sort({ releaseAt: -1 }) // Sắp xếp theo thời gian tạo giảm dần
              .limit(1); // Chỉ lấy ra tập mới nhất

            // Trả về đối tượng anime cùng với tập mới nhất (nếu có)
            return {
              anime,
              latestEpisode,
            };
          })
        );
        const sortedByRating = allAnimes.slice().sort((a, b) => {
          if (a.rating && b.rating) {
            return b.rating.rate - a.rating.rate;
          } else {
            // Đặt anime không có rating ở cuối danh sách
            if (!a.rating) return 1;
            if (!b.rating) return -1;
          }
        });
        // Render trang home với dữ liệu đã lấy
        res.render("home", {
          latestAnimeWithEpisodes: latestAnimeWithEpisodes,
          sortedByRating: sortedByRating,
          loggedIn: sesh.loggedIn,
          userLogin: sesh.userLogin,
        });
      })
      .catch(next);
  }

  //   showAnime(req, res, next) {
  //     let sesh = req.session;
  //     Anime.find({})
  //       .populate("rating")
  //       .populate("episodes")
  //       .then((animes) => {
  //         const allAnimes = multiMongooseToObj(animes);
  //         // Sắp xếp danh sách anime theo rating giảm dần
  //         const sortedByRating = allAnimes.slice().sort((a, b) => {
  //           if (a.rating && b.rating) {
  //             return b.rating.rate - a.rating.rate;
  //           } else {
  //             // Đặt anime không có rating ở cuối danh sách
  //             if (!a.rating) return 1;
  //             if (!b.rating) return -1;
  //           }
  //         });

  //         res.render("home", {
  //           animes: allAnimes,
  //           sortedByRating: sortedByRating,
  //           loggedIn: sesh.loggedIn,
  //           userLogin: sesh.userLogin,
  //         });
  //       })
  //       .catch(next);
  //   }
}

module.exports = new HomeController();
