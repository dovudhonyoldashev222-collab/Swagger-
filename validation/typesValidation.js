const Joi = require("joi");

const createTypesSchema = Joi.object({
    name: Joi.string().min(2).max(50).required()
});

const updateTypesSchema = Joi.object({
    name: Joi.string().min(2).max(50).required()
});

module.exports = {
    createTypesSchema,
    updateTypesSchema
};
