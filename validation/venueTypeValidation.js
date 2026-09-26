const Joi = require("joi");

const venueTypeCreateValidation = Joi.object({
    name: Joi.string().min(2).max(90).required()
});

const venueTypeUpdateValidation = Joi.object({
    name: Joi.string().min(2).max(90).optional()
});

module.exports = { 
    venueTypeCreateValidation, 
    venueTypeUpdateValidation 
};