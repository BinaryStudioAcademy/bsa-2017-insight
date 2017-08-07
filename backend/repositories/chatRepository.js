var connection = require('../db/dbconnect');
var Repository = require('./generalRepository')
var UserRepository = require('./userRepository')
var Chat = require('../schemas/chatSchema').model;


function ChatRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Chat;
}

ChatRepository.prototype = new Repository();

ChatRepository.prototype.createChat = function(data, callback) {
   var model = this.model;
    console.log(data,"body++++++")
   var sender = data.users[0]
   var reciever = data.users[1]
  var newitem = new model(data);
     newitem.save( UserRepository.model.update({"_id":sender,"_id":reciever},{$push:{"chats":newitem._id}},callback))
  

    
};

module.exports = new ChatRepository();
