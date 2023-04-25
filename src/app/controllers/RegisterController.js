
class RegisterController {
    ///GET
    index(req, res, next) {
        res.render('register')
    } 
}
module.exports = new RegisterController();