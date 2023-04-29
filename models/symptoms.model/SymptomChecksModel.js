const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SymptomChecksSchema = new Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SymptomsCategory'
    },
    symptomText: {
        type: String
    },
    isActive: {
        type: Number,
        default: 1
    }
});
module.exports = mongoose.model('SymptomCheck', SymptomChecksSchema);
