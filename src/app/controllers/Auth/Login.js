const userLogin = require('../../models/User');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const authLogin = async (req, res) => { 
    const { mail, password } = req.body;
    if(!mail || !password) {
        return res
            .status(400)
            .json({success: false, message: 'Missing username or password'});
    };
    try {           
        //Check userExists   && check password userExists
        const userExists = await userLogin.findOne({mail});
        const passwordValid = await argon2.verify(userExists.password,password);
        if(!userExists || !passwordValid)
            return  res.status(400).json({ success : false, message : 'Email or password wrong. Check it again'});  
        const accessToken = jwt.sign(
            { userId: userLogin._id, mail },
            process.env.ACCESS_TOKEN 
        );
        res.status(200).json({ success : true, message : 'Login Succsess',
            userDetail: {
            username : userExists.username,
            mail : userExists.mail,
            point: userExists.point,                                     
            _id: userExists._id ,
            accessToken 
            }, 
        });
    } catch(error) {
        return  res.status(500).json({ success : false, message : 'Email or password wrong. Check it again'});  
    }
};
module.exports = authLogin;
