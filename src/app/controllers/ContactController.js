
class ContactController {
    ///GET
    index(req, res, next) {
        let sesh = req.session;
        res.render('contact',
            {
                loggedIn: sesh.loggedIn,
                userLogin: sesh.userLogin,
            });
    }
}
module.exports = new ContactController();