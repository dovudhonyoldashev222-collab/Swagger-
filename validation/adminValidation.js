const Joi = require("joi")
const adminRegisterValidationSchema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    login: Joi.string().min(3).max(40).required(),
    password: Joi.string().min(6).max(40).required()
     .pattern( 
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/ 
    ),
    is_active: Joi.boolean().default(true),
    is_creator: Joi.boolean().default(false)
});

const updateAdminValidationSchema = Joi.object({
    name: Joi.string().min(2).max(40).required().optional(),
    login: Joi.string().min(3).max(40).required().optional(),
    password: Joi.string().min(6).max(40).required()
     .pattern( 
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/ 
    ).optional(),
    is_active: Joi.boolean().default(true).optional(),
    is_creator: Joi.boolean().default(false).optional()
});

module.exports = {
    adminRegisterValidationSchema,
    updateAdminValidationSchema
}