const { Schema, model, models } = require("mongoose");

const langSchema = new Schema({
    name: { type: String, required: true }
});

const Lang = models.Lang || model("Lang", langSchema);

module.exports = { Lang };