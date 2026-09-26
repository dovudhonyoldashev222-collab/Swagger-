const Joi = require("joi");

const ticketCreateValidation = Joi.object({
    event_id: Joi.string().hex().length(24).optional().allow(""),
    seat_id: Joi.string().hex().length(24).optional().allow(""),
    price: Joi.number().positive().required(),
    service_fee: Joi.number().min(0).optional().default(0),
    status_id: Joi.string().hex().length(24).optional().allow(""),
    ticket_type: Joi.string().hex().length(24).optional().allow("")
});

const ticketUpdateValidation = Joi.object({
    event_id: Joi.string().hex().length(24).optional().allow(""),
    seat_id: Joi.string().hex().length(24).optional().allow(""),
    price: Joi.number().positive().optional(),
    service_fee: Joi.number().min(0).optional(),
    status_id: Joi.string().hex().length(24).optional().allow(""),
    ticket_type: Joi.string().hex().length(24).optional().allow("")
});

module.exports = {
    ticketCreateValidation,
    ticketUpdateValidation
};