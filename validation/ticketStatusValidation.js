const Joi = require("joi");

const createTicketStatusSchema = Joi.object({
    name: Joi.string().min(2).max(50).required()
});

const updateTicketStatusSchema = Joi.object({
    name: Joi.string().min(2).max(50).required()
});

module.exports = {
    createTicketStatusSchema,
    updateTicketStatusSchema
};
