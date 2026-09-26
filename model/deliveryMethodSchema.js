const { Schema, model, models } = require("mongoose");

const deliveryMethodSchema = new Schema({
    name: { type: String, required: true }
});

const DeliveryMethod = models.DeliveryMethod || model("DeliveryMethod", deliveryMethodSchema);

module.exports = { DeliveryMethod };