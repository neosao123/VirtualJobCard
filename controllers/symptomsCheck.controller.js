const mongoose = require("mongoose");
const SymptomsChecksModel = require("../models/symptoms.model/SymptomChecksModel");

exports.create = async (req, res) => {
    try {
        const { categoryId, symptomText } = req.body;
        let existingCheck = await SymptomsChecksModel.findOne({ categoryId: categoryId, symptomText: symptomText });
        if (existingCheck) {
            res.status(300).json({ err: 300, msg: "Category already exist" });
        } else {
            let newCheck = await new SymptomsChecksModel({ categoryId: categoryId, symptomText: symptomText });
            newCheck.save();
            res.status(200).json({ err: 200, msg: "Successfully added check", data: newCheck })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.findByCatId = async (req, res) => {
    try {
        const { categoryId } = req.body;
        let dataByCatId = await SymptomsChecksModel.find({ categoryId: categoryId });
        if (dataByCatId.length > 0) {
            res.json({ err: 200, msg: "Data found", total: dataByCatId.length, data: dataByCatId, });
        } else {
            res.json({ err: 300, msg: "No data found" });
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}