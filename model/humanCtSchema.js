const { Schema, model, models } = require("mongoose");

const humanCtSchema = new Schema({
    name: {type: String,required: true,trim: true},
    start_age: {type: Number,required: true,min: 0},
    finish_age: {type: Number,required: true,min: 0},
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"], alias: "jinsi" },
});

const HumanCt = models.HumanCt || model("HumanCt", humanCtSchema);
module.exports = { HumanCt };