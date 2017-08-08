var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var supportSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: String,
    typeId: Schema.ObjectId,
    expertise: String,
    avatar: {
        type: String,
        default: 'http://cdn.onlinewebfonts.com/svg/img_67707.svg'
    },
    registered: Date,
    apps: [Schema.ObjectId]
});

module.exports = mongoose.model('Support', supportSchema);