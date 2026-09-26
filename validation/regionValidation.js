const Joi = require("joi");

const createRegionSchema = Joi.object({
    name: Joi.string().min(2).max(50).required()
});

const updateRegionSchema = Joi.object({
    name: Joi.string().min(2).max(50).required()
});

module.exports = {
    createRegionSchema,
    updateRegionSchema
};
