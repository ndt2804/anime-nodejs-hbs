
class ContactController {
    ///GET
    index(req, res, next) {
        res.render('admin', { layout: false });
    } 
}
module.exports = new ContactController();