
class ContactController {
    ///GET
    index(req, res, next) {
        res.render('contact')
    }
}
module.exports = new ContactController();