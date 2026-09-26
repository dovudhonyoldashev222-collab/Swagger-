const { Schema, model, models } = require("mongoose");

const regionSchema = new Schema({
    name: { type: String, required: true }
});

const Region = models.Region || model("Region", regionSchema);

module.exports = { Region };
