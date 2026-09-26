const { Schema, model, models } = require("mongoose");

const venueSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    site: { type: String, default: null },
    phone: { type: String, required: true },
    venue_type_id: { type: Schema.Types.ObjectId, ref: "VenueType" },
    schema: { type: String, default: null }, 
    region_id: { type: Number, required: true },
    district_id: { type: Number, required: true }
});

const Venue = models.Venue || model("Venue", venueSchema);
module.exports = { Venue };