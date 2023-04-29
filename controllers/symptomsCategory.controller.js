const mongoose = require("mongoose");
const SymptomsCategoryModel = require("../models/symptoms.model/SymptomsCategoryModel");
exports.create = async (req, res) => {
    try {
        const { SymptomsCategoryName } = req.body;
        let existingCategory = await SymptomsCategoryModel.findOne({ SymptomsCategoryName: SymptomsCategoryName });

        if (existingCategory) {
            res.status(300).json({ err: 300, msg: "Category already exist", data: existingCategory });
        } else {
            let newCategory = await new SymptomsCategoryModel({
                SymptomsCategoryName: SymptomsCategoryName
            });
            newCategory.save();
            res.status(200).json({ err: 200, msg: "Successfully added category", data: newCategory })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.fetchCategories = async (req, res) => {
    try {
        let fetchedData = await SymptomsCategoryModel.find({});
        if (fetchedData) {
            res.status(200).json({ err: 200, msg: "Data Found", data: fetchedData })
        } else {
            res.status(300).json({ err: 300, msg: "No Data Found" })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}