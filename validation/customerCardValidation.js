const Joi = require("joi");

const customerCardCreateValidation = Joi.object({
    customer_id: Joi.string().hex().allow(""),
    name: Joi.string().required(),
    phone: Joi.string().pattern(/^(\+?998)?\d{9}$/).required(),
    number: Joi.string().min(16).max(16).required(),
    year: Joi.string().length(2).required(),
    month: Joi.string().length(2).required(),
    is_active: Joi.boolean().default(true),
    is_main: Joi.boolean().default(false)
});

const customerCardUpdateValidation = Joi.object({
    customer_id: Joi.string().hex().optional(),
    name: Joi.string().optional(),
    phone: Joi.string().pattern(/^(\+?998)?\d{9}$/).optional(),
    number: Joi.string().min(16).max(16).optional(),
    year: Joi.string().length(2).optional(),
    month: Joi.string().length(2).optional(),
    is_active: Joi.boolean().optional(),
    is_main: Joi.boolean().optional()
});

module.exports = { customerCardCreateValidation, customerCardUpdateValidation };