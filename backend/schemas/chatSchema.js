const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  _chatId: {
    type: Schema.Types.ObjectId
  },  

  assigned: {
    type: Boolean
  },

  status: {
    type: String,
    enum: ['open','closed']
  },

  messages: [{//is it right linking?
    _userId: {
      type: Schema.Types.ObjectId, 
      ref: 'User'
    },
    _supportId: {
      type: Schema.Types.ObjectId, 
      ref: 'Support'
    },
    text: String,
    createdAt: Date
  }],
}, 

  {versionKey: false}//should we do it?
);

module.exports = mongoose.model('Chat', chatSchema); 