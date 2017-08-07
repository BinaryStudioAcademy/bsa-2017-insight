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
    
   var first = data.users[0]
   var second = data.users[1]
   var newitem = new model(data);
     newitem.save( UserRepository.model.update({"_id":first},{$push:{"chats":newitem._id}},function(){
         UserRepository.model.update({"_id":second},{$push:{"chats":newitem._id}},callback)
     }))
  

    
};

module.exports = new ChatRepository();
