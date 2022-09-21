const Joi = require('@hapi/joi');

const registerValidate = ( data ) => {
    const schema = Joi.object({
        name : Joi.string().required().min(3).max(50),
        email : Joi.string().required().min(3).max(50),
        phone: Joi.string().min(10).max(16),
        cpf : Joi.string().required().min(11).max(17),
        password : Joi.string().required().min(6).max(100),
    });
    return schema.validate(data);
};


const loginValidate = ( data ) => {
    const schema = Joi.object({
        cpf : Joi.string().required().min(11).max(17),
        password : Joi.string().required().min(6).max(100),
    });
    return schema.validate(data);
};

const processValidate = ( data ) => {
    const schema = Joi.object({
        cpfpacient : Joi.string().required().min(11).max(17),
        nprocess : Joi.string().required().min(1).max(1000),
        optionTerm : Joi.string().required().min(7).max(100),
        lastAccess : Joi.string().required().min(8).max(10),
        status : Joi.string().required().min(5).max(100),
    });
    return schema.validate(data);
};


module.exports.loginValidate = loginValidate;
module.exports.registerValidate = registerValidate;
module.exports.processValidate = processValidate;