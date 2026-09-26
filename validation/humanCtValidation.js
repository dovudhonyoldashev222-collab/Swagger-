const Joi = require("joi");
const humanCtCreateValidation = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    start_age: Joi.number().integer().required(),
    finish_age: Joi.number().integer().required(),
    gender: Joi.string()
});

const humanCtUpdateValidation = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    start_age: Joi.number().integer().optional(),
    finish_age: Joi.number().integer().optional(),
    gender: Joi.string().optional()
});

module.exports = {
    humanCtCreateValidation,
    humanCtUpdateValidation
};