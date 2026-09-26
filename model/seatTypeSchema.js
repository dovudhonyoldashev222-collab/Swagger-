const { Schema, model, models } = require("mongoose");

const seatTypeSchema = new Schema({
    name: { type: String, required: true, trim: true }
});

const SeatType = models.SeatType || model("SeatType", seatTypeSchema);
module.exports = { SeatType };