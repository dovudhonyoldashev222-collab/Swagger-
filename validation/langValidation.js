const Joi = require("joi");

const createLangSchema = Joi.object({
    name: Joi.string().min(2).max(30).required()
});

const updateLangSchema = Joi.object({
    name: Joi.string().min(2).max(30).required()
});

module.exports = {
    createLangSchema,
    updateLangSchema
};
