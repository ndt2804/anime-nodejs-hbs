
class ContactController {
    ///GET
    index(req, res, next) {
        res.render('admin/homeAdmin', { layout: 'admin' });
    }
    show(req, res, next) {
        res.render('admin/animeAdmin',{ layout: 'admin' });
    } 
}
module.exports = new ContactController();