const { Schema, model, models } = require("mongoose");

const ticketSchema = new Schema(
  {
    event_id: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: null,
    },
    seat_id: {
      type: Schema.Types.ObjectId,
      ref: "Seat",
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    service_fee: {
      type: Number,
      required: true,
      default: 0,
    },
    status_id: {
      type: Schema.Types.ObjectId,
      ref: "TicketStatus",
      required: true,
    },
    ticket_type: {
      type: Schema.Types.ObjectId,
      ref: "Types",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = models.Ticket || model("Ticket", ticketSchema);
module.exports = { Ticket };