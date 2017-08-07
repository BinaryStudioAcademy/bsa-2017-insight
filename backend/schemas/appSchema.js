var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userSchema');

var appSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: 'http://cdn.onlinewebfonts.com/svg/img_67707.svg'
    },
    users: [User]
});

module.exports = mongoose.model('App', appSchema);