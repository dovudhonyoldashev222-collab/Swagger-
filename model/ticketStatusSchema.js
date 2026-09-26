const { Schema, model, models } = require("mongoose");

const ticketStatusSchema = new Schema({
    name: { type: String, required: true }
});

const TicketStatus = models.TicketStatus || model("TicketStatus", ticketStatusSchema);

module.exports = { TicketStatus };