const Joi = require("joi");

const cartCreateValidation = Joi.object({
    ticket_id: Joi.string().hex().required(),
    customer_id: Joi.string().hex().required(),
    fineshedAt: Joi.date().optional().allow(null),
    status_id: Joi.number().integer().default(1)
});

const cartUpdateValidation = Joi.object({
    ticket_id: Joi.string().hex().optional(),
    customer_id: Joi.string().hex().optional(),
    fineshedAt: Joi.date().optional().allow(null),
    status_id: Joi.number().integer().optional()
});

module.exports = {
    cartCreateValidation,
    cartUpdateValidation
};