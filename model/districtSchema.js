const { Schema, model, models } = require("mongoose");

const districtSchema = new Schema({
    name: { type: String, required: true },
    regionId: { 
        type: Schema.Types.ObjectId, 
        ref: "Region", 
        required: true 
    }
});

const District = models.District || model("District", districtSchema);

module.exports = { District };