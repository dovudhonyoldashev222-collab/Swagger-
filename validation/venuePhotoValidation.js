const Joi = require("joi");

const venuePhotoCreateValidation = Joi.object({
    venue_id: Joi.string().hex().required(),
    url: Joi.string().uri().required()
});

const venuePhotoUpdateValidation = Joi.object({
    venue_id: Joi.string().optional(),
    url: Joi.string().uri().optional()
});

module.exports = { 
    venuePhotoCreateValidation, 
    venuePhotoUpdateValidation 
};