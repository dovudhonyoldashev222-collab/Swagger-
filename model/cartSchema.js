const { Schema, model, models } = require("mongoose");

const cartSchema = new Schema({
    ticket_id: { type: Schema.Types.ObjectId, ref: "Ticket" },
    customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
    fineshedAt: { type: Date, default: null },
    status_id: { type: Number, required: true, default: 1 }
}, {
    timestamps: true 
});

const Cart = models.Cart || model("Cart", cartSchema);
module.exports = { Cart };