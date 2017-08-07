const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supportSchema = new Schema({
  _supportId: {
    type: Schema.Types.ObjectId
  },

  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  password: {//hash it!!
    type: String,
    required: true
  },

  avatar: {
    type: String,
    default: '../assets/user.png'
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  supportType: {
    type: String,
    enum: ['admin','support-member']
  },

  supportLine: {
    type: String,
    enum: ['first','second','third']
  },

  chats: [{
    type: Schema.Types.ObjectId, 
    ref: 'Chat' 
  }]
}, 

  {versionKey: false}//should we do it?
);

module.exports = mongoose.model('Support', supportSchema); 