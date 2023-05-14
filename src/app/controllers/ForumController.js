
class ContactController {
    ///GET
    index(req, res, next) {
        res.render('forum')
    }
}
module.exports = new ContactController();