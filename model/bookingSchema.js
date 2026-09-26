const { Schema, model, models } = require("mongoose");

const bookingSchema = new Schema({
    cart_id: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
    payment_method_id: { type: Number, required: true },
    delivery_method_id: { type: Number, required: true },
    discount_coupon_id: { 
        type: Schema.Types.ObjectId, 
        ref: "DiscountCoupon", 
        default: null 
    },
    status_id: { type: Number, required: true, default: 1 }
}, {
    timestamps: true 
});

const Booking = models.Booking || model("Booking", bookingSchema);
module.exports = { Booking };