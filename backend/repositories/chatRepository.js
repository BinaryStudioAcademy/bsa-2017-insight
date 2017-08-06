var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Chat = require('../schemas/chatSchema');

function ChatRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Chat;
}

ChatRepository.prototype = new Repository();

ChatRepository.prototype.oneMoreFunction = function(chatId, obj, callback) {
    var model = this.model;
    var query = model.findByIdAndUpdate(chatId, {
        $push: {
            property:{
                nestedProperty: value,
            }
        }
    }, {});
    query.exec(callback);
};

module.exports = new ChatRepository();
