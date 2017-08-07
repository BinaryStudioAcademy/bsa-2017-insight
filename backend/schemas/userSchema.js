var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    surname: String,
    nickname: {
        type: String,
        default: 'unknown'
    },
    avatar: {
        type: String,
        default: 'http://cdn.onlinewebfonts.com/svg/img_210318.svg'
    },
    company: String,
    city: String,
    country: String,
    languages: {
        type: [String],
        default: void 0
    },
    email: String,
    phone: String,
    gender: String,
    age: String,
    chatNum: {
        type: Number,
        default: 0
    },
    registered: Date,
    firstVisit: Date,
    lastVisit: Date,
    sessionNum: {
        type: Number,
        default: 0
    },
    lastSessionInfo: {
        ip: String,
        localTime: Date,
        timeZone: String,
        OS: String,
        browser: String,
        browserVersion: String,
        systemLanguage: String,
        typingLanguages: {
            type: [String],
            default: void 0
        },
        screenSize: {
            type: [Number],
            default: void 0
        },
        allowedCookies: Boolean,
        country: String,
        city: String
    }
});

module.exports = userSchema;