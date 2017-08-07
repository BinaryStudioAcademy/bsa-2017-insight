var connection = require('../db/dbconnect');
var Repository = require('./generalRepository')
var ChatRepository = require('./chatRepository')
var Message = require('../schemas/messageSchema').model;


function MessageRepository() {
	Repository.prototype.constructor.call(this);
	this.model = Message;
}

MessageRepository.prototype = new Repository();

MessageRepository.prototype.createMessage = function(data, callback) {
    var model = this.model;
    var newitem = new model(data);
    console.log(newitem,">>>>>>>>>>>>>>>>>>>>>>")
    newitem.save(function(){
         ChatRepository.model.findByIdAndUpdate(data.chatId,{$push:{"messages":newitem._id}},callback)
    });
 
   
};


module.exports = new MessageRepository();
