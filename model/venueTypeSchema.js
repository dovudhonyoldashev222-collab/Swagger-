const { Schema, model, models } = require("mongoose");

const venueTypeSchema = new Schema({
    name: {type: String, required: true, trim: true}
});

const VenueType = models.VenueType || model("VenueType", venueTypeSchema);
module.exports = { VenueType };