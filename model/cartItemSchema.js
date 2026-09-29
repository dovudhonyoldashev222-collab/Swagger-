const { Schema, model, models } = require("mongoose");

const cartItemSchema = new Schema(
  {
    ticket_id: { 
      type: Schema.Types.ObjectId, 
      ref: "Ticket", 
      required: true 
    },
    cart_id: { 
      type: Schema.Types.ObjectId, 
      ref: "Cart", 
      required: true 
    }
  },
  { 
    timestamps: true 
  }
);

// Modelni yaratish va to'g'ri eksport qilish
const CartItem = models.CartItem || model("CartItem", cartItemSchema);

module.exports = { CartItem };