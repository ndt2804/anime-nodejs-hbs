
class ContactController {
    ///GET
    index(req, res, next) {
        res.render('admin')
    } 
}
module.exports = new ContactController();