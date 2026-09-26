const Joi = require("joi");

const seatCreateValidation = Joi.object({
    sector: Joi.number().integer().required(),
    row_number: Joi.number().integer().required(),
    number: Joi.number().integer().required(),
    venue_id: Joi.string().hex().allow(""),
    seat_type_id: Joi.string().hex().allow(""),
    location_in_schema: Joi.string().optional().allow("")
});

const seatUpdateValidation = Joi.object({
    sector: Joi.number().integer().optional(),
    row_number: Joi.number().integer().optional(),
    number: Joi.number().integer().optional(),
    venue_id: Joi.string().hex().optional(),
    seat_type_id: Joi.string().hex().optional(),
    location_in_schema: Joi.string().optional().allow("")
});

module.exports = { seatCreateValidation, seatUpdateValidation };