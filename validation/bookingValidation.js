const Joi = require("joi");

const bookingCreateValidation = Joi.object({
    cart_id: Joi.string().hex().required(),
    fineshed: Joi.date().optional().allow(null),
    payment_method_id: Joi.number().integer().required(),
    delivery_method_id: Joi.number().integer().required(),
    discount_coupon_id: Joi.string().hex().optional().allow(null),
    status_id: Joi.number().integer().default(1)
});

const bookingUpdateValidation = Joi.object({
    cart_id: Joi.string().hex().optional(),
    fineshed: Joi.date().optional().allow(null),
    payment_method_id: Joi.number().integer().optional(),
    delivery_method_id: Joi.number().integer().optional(),
    discount_coupon_id: Joi.string().hex().optional().allow(null),
    status_id: Joi.number().integer().optional()
});

module.exports = {
    bookingCreateValidation,
    bookingUpdateValidation
};