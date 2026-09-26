const { Schema, model, models } = require("mongoose");

const customerSchema = new Schema({
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true },
    hashed_password: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    birth_date: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"], alias: "jinsi" },
    lang_id: { type: String, required: true, default: "uz" },
    hashed_refresh_token: { type: String, default: null }
});

const Customer = models.Customer || model("Customer", customerSchema);
module.exports = { Customer };