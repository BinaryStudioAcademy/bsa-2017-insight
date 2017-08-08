var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var supportTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String
});

module.exports = mongoose.model('SupportType', supportTypeSchema);