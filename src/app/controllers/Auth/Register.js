const userRegister = require('../../models/User');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
require('dotenv').config();
const authRegister = async (req, res) => {
    const { username, password, mail} = req.body;
    //Validation
    if(!mail || !password)
        return res
            .status(400)
            .json({success: false, message: 'Missing mail or password'});
            try {                    
                //Check exists   
                const userExists = await userRegister.findOne({mail})
                if (userExists) {
                    return res.status(400).json({success: false, message: 'Email already taken'})
                }      
                //Create NewUser
                const hashPassword = await argon2.hash(password);
                const newUser = await userRegister({
                    username,
                    password: hashPassword,
                    mail
                });
                await newUser.save();
                //Check Auth
                const accessToken = jwt.sign(
                    { userId: newUser._id, mail },
                process.env.ACCESS_TOKEN 
                );
                res.status(200).json({ success : true, message : 'Create success',
                    userDetail: {
                        username : newUser.username,
                        password : newUser.password,
                        mail : newUser.mail,
                        point: newUser.point,                                     
                        _id: newUser._id,
                        accessToken
                    }, 
                });
            } catch(error) {
                return res.status(500).json({ success : false, message : 'Failed'})
            }
    
};

module.exports = authRegister;
