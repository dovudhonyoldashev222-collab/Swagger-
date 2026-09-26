const { Schema, model, models } = require("mongoose");

const customerAddressSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
    name: { type: String, required: true },
    country_id: { type: Number, required: true },
    region_id: { type: Number, required: true },
    district_id: { type: Number, required: true },
    street: { type: String, required: true },
    house: { type: String, required: true },    
    flat: { type: Number, default: null },
    location: { type: String, required: true },
    post_index: { type: String, required: true },
    info: { type: String, default: "" }
});

const CustomerAddress = models.CustomerAddress || model("CustomerAddress", customerAddressSchema);
module.exports = { CustomerAddress };