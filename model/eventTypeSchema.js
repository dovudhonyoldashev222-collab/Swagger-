const { Schema, model, models } = require("mongoose");

const eventTypeSchema = new Schema({
    name: { type: String, required: true, trim: true },
    parent_event_type_id: {
        type: Schema.Types.ObjectId,
        ref: "EventType", default: null
    }
});

const EventType = models.EventType || model("EventType", eventTypeSchema);
module.exports = { EventType };