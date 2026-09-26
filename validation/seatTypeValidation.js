const Joi = require("joi");

const seatTypeCreateValidation = Joi.object({
    name: Joi.string().min(2).max(50).required()
});

const seatTypeUpdateValidation = Joi.object({
    name: Joi.string().min(2).max(50).optional()
});

module.exports = { 
    seatTypeCreateValidation, 
    seatTypeUpdateValidation
};