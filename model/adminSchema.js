const {Schema, model, models} = require("mongoose")

const adminSchema = new Schema({
    name: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    is_active: { type: Boolean},
    is_creator: { type: Boolean,},
})

const Admin = models.Admin || model("Admin", adminSchema)
module.exports= {Admin}

