// Import library of Joi
const Joi = require('@hapi/joi');

// Create Signup Validation
const SignupValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema)
}

// Create Login Validation
const LoginValidation = data =>{
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema)
}

module.exports.SignupValidation = SignupValidation;
module.exports.LoginValidation = LoginValidation;