var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var oneSessionSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    userId: String, //connection to User Schema
    sessionDate: Date,
    visitedPages: Array, 
    lastVisitedPage: String,
    pageStartRequest: String,
});

module.exports = mongoose.model('Session', oneSessionSchema); 