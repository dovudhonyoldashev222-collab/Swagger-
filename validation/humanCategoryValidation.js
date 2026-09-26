const Joi = require("joi");

const createHumanCategorySchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    start_age: Joi.number().integer().min(0).max(120).required(),
    finish_age: Joi.number().integer().min(0).max(120).required(),
    gender: Joi.string().valid("male", "female", "common").required()
});

const updateHumanCategorySchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    start_age: Joi.number().integer().min(0).max(120).optional(),
    finish_age: Joi.number().integer().min(0).max(120).optional(),
    gender: Joi.string().valid("male", "female", "common").optional()
});

module.exports = {
    createHumanCategorySchema,
    updateHumanCategorySchema
};
