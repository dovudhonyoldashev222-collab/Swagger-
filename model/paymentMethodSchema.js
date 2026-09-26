const { Schema, model, models } = require("mongoose");

const paymentMethodSchema = new Schema({
    name: { type: String, required: true }
});

const PaymentMethod = models.PaymentMethod || model("PaymentMethod", paymentMethodSchema);

module.exports = { PaymentMethod };