const Joi = require("joi");

const createDistrictSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    regionId: Joi.alternatives().try(
        Joi.string().length(24),
        Joi.number().integer().positive()
    ).required()
});

const updateDistrictSchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    regionId: Joi.alternatives().try(
        Joi.string().length(24),
        Joi.number().integer().positive()
    ).optional()
});

module.exports = {
    createDistrictSchema,
    updateDistrictSchema
};
