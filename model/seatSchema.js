const { Schema, model, models } = require("mongoose");

const seatSchema = new Schema({
    sector: { type: Number, required: true },
    row_number: { type: Number, required: true },
    number: { type: Number, required: true },
    venue_id: { type: Schema.Types.ObjectId, ref: "Venue" },
    seat_type_id: { type: Schema.Types.ObjectId, ref: "SeatType", required: true },
    location_in_schema: { type: String, default: "" }
});

const Seat = models.Seat || model("Seat", seatSchema);
module.exports = { Seat };