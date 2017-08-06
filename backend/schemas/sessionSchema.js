var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userSchema');

var sessionSchema = new Schema({
    globalId: Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    sessionDate: { type: Date, default: Date.now()},
    visitedPages: Array, 
    lastVisitedPage: String,
    pageStartRequest: String,
});

module.exports = mongoose.model('SessionData', sessionSchema); 