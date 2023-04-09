const express = require('express');
const router = express.Router();
const authControllers = require('../app/controllers/Auth/Auth')
const { validate, Joi } = require('express-validation');
const registerValidation = {
    body: Joi.object({ 
        username: Joi.string()
            .required(),  
        password: Joi.string()           
            .required(),
        mail: Joi.string()
            .email()
            .required()
    }),
}
const LoginValidation = {
    body: Joi.object({   
        mail: Joi.string()
        .email()
        .required(),
        password: Joi.string()           
            .required()
    }),
}

router.use('/api/auth/register',validate(registerValidation), authControllers.controllers.authRegister );
router.use('/api/auth/login',validate(LoginValidation), authControllers.controllers.authLogin );

module.exports = router;