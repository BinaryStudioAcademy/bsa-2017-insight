var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var convParticipantsSchema = new Schema({
    convParticipantsId: Schema.Types.ObjectId,
    convId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    userConnectionDate: Date,

});

module.exports = mongoose.model('ConvParticipants', convParticipantsSchema); 