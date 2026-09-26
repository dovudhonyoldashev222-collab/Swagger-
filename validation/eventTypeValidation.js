const Joi = require("joi");
const eventTypeCreateValidation = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    parent_event_type_id: Joi.string().hex().optional().allow(null)
});

const eventTypeUpdateValidation = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    parent_event_type_id: Joi.string().hex().optional().allow(null)
});

module.exports = {
    eventTypeCreateValidation,
    eventTypeUpdateValidation
};