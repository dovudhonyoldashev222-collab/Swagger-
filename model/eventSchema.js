const { Schema, model, models } = require("mongoose");

const eventSchema = new Schema({
    name: { type: String, required: true },
    photo: { type: String, default: null },
    start_date: { type: Date, required: true },
    start_time: { type: String, required: true },
    finish_date: { type: Date, required: true },
    finish_time: { type: String, required: true },
    info: { type: String, default: "" },
    event_type_id: { type: Schema.Types.ObjectId, ref: "EventType" },
    human_category_id: { type: Schema.Types.ObjectId, ref: "HumanCt" },
    venue_id: { type: Schema.Types.ObjectId, ref: "Venue" },
    lang_id: { type: Number, required: true, default: 1 },
    release_date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Event = models.Event || model("Event", eventSchema);
module.exports = { Event };