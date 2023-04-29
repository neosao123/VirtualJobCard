const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    cname: {
        type: String,
        required: true
    },
    caddress: {
        type: String,
        required: true
    },
    mobileTeleNumber: {
        type: Number,
        required: true
    },
    homeTeleNumber: {
        type: Number,
        required: true
    },
    officeTeleNumber: {
        type: Number,
        required: true
    },
    cemail: {
        type: String,
        required: true
    },
    drivenBy: {
        type: String,
        enum: ['owner', 'family', 'others']
    },
    others: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("customer", customerSchema);
