const { Schema, model, models } = require("mongoose");

const venuePhotoSchema = new Schema({
    venue_id: { type: Schema.Types.ObjectId, ref: "Venue" },
    url: { type: String, required: true }
});

const VenuePhoto = models.VenuePhoto || model("VenuePhoto", venuePhotoSchema);
module.exports = { VenuePhoto };