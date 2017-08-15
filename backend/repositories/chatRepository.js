var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Chat = require('../schemas/chatSchema');

function ChatRepository() {
  Repository.prototype.constructor.call(this);
  this.model = Chat;
}

ChatRepository.prototype = new Repository();


ChatRepository.prototype.getStatus = function(status, callback) {
  var model = this.model;
  var query = model.find({ 'status': status });
  query.exec(callback);
};

ChatRepository.prototype.getDate = function(date, callback) {
  var model = this.model;
  var query = model.find({ 'messages.createdAt': date });
  query.exec(callback);
};

module.exports = new ChatRepository();
