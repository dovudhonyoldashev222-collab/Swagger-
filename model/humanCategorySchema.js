const { Schema, model, models } = require("mongoose");

const humanCategorySchema = new Schema({
    name: { type: String, required: true },
    start_age: { type: Number, required: true },
    finish_age: { type: Number, required: true },
    gender: { type: String }
});

const HumanCategory = models.HumanCategory || model("HumanCategory", humanCategorySchema);

module.exports = { HumanCategory };