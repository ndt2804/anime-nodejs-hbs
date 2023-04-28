const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const users = require('../models/User');
const { mongooseToObj } = require('../../utils/mongoose');
class LoginController {


    index(req, res, next) {
        res.render('login', {title:'Login', loggedIn:false, error:null});
    };
    
    newAct(req,res,next) {
        res.render('new-act', {title:'New Account', loggedIn:false, error:null});
    };
    login = async(req, res) => {
        let mail = req.body.emailInput;
        let pass = req.body.pwdInput;
        let loginSuccess = false;
        console.log(req.body);
        let sesh = req.session;
        const filter = { mail: mail };
        sesh.loggedIn = false;
        if (mail != '' && pass != '') {
            
          // find account using email
          let usersResult = await users.findOne(filter).then( async(data) => {
            if (data) {
              // check if password matches
              console.log(data.password);
              let passResult = await bcrypt.compare(pass, data.password).then( (isMatch) => {
                if (isMatch) {
                  // ok - set sessions
                  sesh.loggedIn = true;
                  loginSuccess = true;
                  sesh.userLogin = data;
                }
              });
            }
          });
        }
      
        if (loginSuccess === true) {
          res.redirect('/');
        } else {
          res.render('login', {title:'Login', loggedIn:false, error:'Invalid Login!'});
        }
    };
    
    new =  async(req, res) => { 
        const mail = req.body.emailInput;
        const username = req.body.usernameInput;
        const pwd = req.body.pwdInput;
        console.log(req.body);
        const filter = { mail: mail };
        if (mail != '' && pwd != '' && username != '') {
            const userSearch = await users.findOne(filter).then( async(data) => {
            if (!data) {
              // password encryption
                const hashedPassword = await bcrypt.hash(pwd, 12);
                const newUser = new users({
                        username,
                        password: hashedPassword,
                        mail,
                      });
            await newUser.save();
            }
          });
      
          res.render('login', {title:'Login', loggedIn:false, error:'Please login with your new account'});
        } else {
          res.render('new-acct', {title:'New Account', loggedIn:false, error:'All fields are required. Please check and try again.'});
        }
    }   
}


module.exports = new LoginController();
