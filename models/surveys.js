
var mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    name: String,
    start: String,
    end: String,
    description: String,
    dls: Array,
    users: Array,
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;