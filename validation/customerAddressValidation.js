const Joi = require("joi");

const addressCreateValidation = Joi.object({
    customer_id: Joi.string().hex().allow(""),
    name: Joi.string().required(),
    country_id: Joi.number().integer().required(),
    region_id: Joi.number().integer().required(),
    district_id: Joi.number().integer().required(),
    street: Joi.string().required(),
    house: Joi.string().required(),
    flat: Joi.number().integer().optional().allow(null),
    location: Joi.string().required().pattern(
        /^-?([0-8]?[0-9](\.[0-9]+)?|90(\.0+)?),\s?-?(1[0-7][0-9](\.[0-9]+)?|[0-9]?[0-9](\.[0-9]+)?|180(\.0+)?)$/
    ),
    post_index: Joi.string().required(),
    info: Joi.string().optional().allow("")
});

const addressUpdateValidation = Joi.object({
    customer_id: Joi.string().hex().optional(),
    name: Joi.string().optional(),
    country_id: Joi.number().integer().optional(),
    region_id: Joi.number().integer().optional(),
    district_id: Joi.number().integer().optional(),
    street: Joi.string().optional(),
    house: Joi.string().optional(),
    flat: Joi.number().integer().optional().allow(null),
    location: Joi.string().optional().pattern(
        /^-?([0-8]?[0-9](\.[0-9]+)?|90(\.0+)?),\s?-?(1[0-7][0-9](\.[0-9]+)?|[0-9]?[0-9](\.[0-9]+)?|180(\.0+)?)$/
    ),
    post_index: Joi.string().optional(),
    info: Joi.string().optional().allow("")
});

module.exports = { addressCreateValidation, addressUpdateValidation };