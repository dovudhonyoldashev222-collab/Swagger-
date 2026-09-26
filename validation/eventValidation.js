const Joi = require("joi");

const eventCreateValidation = Joi.object({
    name: Joi.string().min(3).required(),
    photo: Joi.string().uri().optional().allow(null, ""),
    start_date: Joi.date().required(),
    start_time: Joi.string().required()
    .pattern(/^([0-9]{2})\:([0-9]{2})$/),
    finish_date: Joi.date().required(),
    finish_time: Joi.string().required()
    .pattern(/^([0-9]{2})\:([0-9]{2})$/),
    info: Joi.string().optional().allow(""),
    event_type_id: Joi.string().hex().allow(""),
    human_category_id: Joi.string().hex().allow(""),
    venue_id: Joi.string().hex().allow(""),
    lang_id: Joi.number().integer().default(1),
    release_date: Joi.date().optional()
});

const eventUpdateValidation = Joi.object({
    name: Joi.string().min(3).optional(),
    photo: Joi.string().uri().optional().allow(null, ""),
    start_date: Joi.date().optional(),
    start_time: Joi.string().optional()
    .pattern(/^([0-9]{2})\:([0-9]{2})$/),
    finish_date: Joi.date().optional(),
    finish_time: Joi.string().optional()
    .pattern(/^([0-9]{2})\:([0-9]{2})$/),
    info: Joi.string().optional().allow(""),
    event_type_id: Joi.string().hex().optional(),
    human_category_id: Joi.string().hex().optional(),
    venue_id: Joi.string().hex().optional(),
    lang_id: Joi.number().integer().optional(),
    release_date: Joi.date().optional()
});

module.exports = {
    eventCreateValidation,
    eventUpdateValidation
};