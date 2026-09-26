const Joi = require("joi");

const customerCreateValidation = Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    phone: Joi.string().pattern(/^(\+?998)?\d{9}$/).required(),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).required(),
    email: Joi.string().email().required(),
    birth_date: Joi.date().iso().required(),
    gender: Joi.string().required(),
    lang_id: Joi.string().default("uz")
});

const customerUpdateValidation = Joi.object({
    first_name: Joi.string().min(2).max(50).optional(),
    last_name: Joi.string().min(2).max(50).optional(),
    phone: Joi.string().pattern(/^(\+?998)?\d{9}$/).optional(),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).optional(),
    email: Joi.string().email().optional(),
    birth_date: Joi.date().iso().optional(),
    gender: Joi.string().optional(),
    lang_id: Joi.string().optional()
});

module.exports = { customerCreateValidation, customerUpdateValidation };