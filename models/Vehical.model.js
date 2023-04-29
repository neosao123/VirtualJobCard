const mongoose = require("mongoose");
const CustomerModel = require("../models/Customer.model");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CustomerModel
    },
    vehicleRegNo: {
        type: String,
        required: true
    },
    modelYear: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear(),
        required: true
    },
    modelCode: {
        type: String,
        required: true,
        // match: [/^[a-zA-Z]{3}\d{3}$/, 'Invalid model code']
    },
    vinNo: {
        type: String,
        required: true
    },
    colorCode: {
        type: String,
        required: true
    },
    saleNumber: {
        type: String
    },
    sscScInfo: {
        type: String
    },
    egNumber: {
        type: String
    },
    dlrNo: {
        type: String
    },
    opNo: {
        type: String
    },
    completedOpNo: {
        type: String
    }
});

module.exports = mongoose.model("vehicle", vehicleSchema);