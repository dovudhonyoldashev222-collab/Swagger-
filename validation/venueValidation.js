const Joi = require("joi");

const venueCreateValidation = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    address: Joi.string().required(),
    location: Joi.string().required(),
    site: Joi.string().uri().optional().allow(null, ""),
    phone: Joi.string().required().pattern(/^(\+?998)?\d{9}$/),
    venue_type_id: Joi.string().hex().allow(""),
    schema: Joi.string().optional().allow(null, ""),
    region_id: Joi.number().integer().required(),
    district_id: Joi.number().integer().required()
});

const venueUpdateValidation = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    address: Joi.string().optional(),
    location: Joi.string().optional(),
    site: Joi.string().uri().optional().allow(null, ""),
    phone: Joi.string().optional().pattern(/^(\+?998)?\d{9}$/),
    venue_type_id: Joi.string().hex().optional(),
    schema: Joi.string().optional().allow(null, ""),
    region_id: Joi.number().integer().optional(),
    district_id: Joi.number().integer().optional()
});

module.exports = {
    venueCreateValidation,
    venueUpdateValidation
};