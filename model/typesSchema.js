const { Schema, model, models } = require("mongoose");

const typesSchema = new Schema({
    name: { type: String, required: true }
});

const Types = models.Types || model("Types", typesSchema);

module.exports = { Types };