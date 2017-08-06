var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Message = require('../schemas/messageSchema');

function MessageRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Message;
}

MessageRepository.prototype = new Repository();

MessageRepository.prototype.oneMoreFunction = function(messageId, obj, callback) {
    var model = this.model;
    var query = model.findByIdAndUpdate(messageId, {
        $push: {
            property:{
                nestedProperty: value,
            }
        }
    }, {});
    query.exec(callback);
};

module.exports = new MessageRepository();
