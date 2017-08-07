const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*var userSchema = new Schema({
  globalId: Schema.Types.ObjectId,
  login: String,
  userName: String,
  userSurname: String,
  avatar: String
});*/


const userSchema = new Schema({
  _userId: {
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

  tariffPlan: {
    type: String,
    enum: ['user','corporate-user','vip-user']
  },

  companyName: {
    type: String
  },

  location: [{
    country: {
      type: String
    },
    city: {
      type: String
    }
  }],

  userLanguage: {
    type: String
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phoneNumber: {
    type: String
  },

  sex: {
    type: String,
    enum: ['male','female']
  },

  dateOfBirth: {
    type: Date
  },

  registeredAt: {
    type: Date
  },

  firstSignedUpAt: {
    type: Date
  },

  lastSignedUpAt: {
    type: Date
  },

  sessionCount: {
    type: Number
  },

  chats: [{
    type: Schema.Types.ObjectId, 
    ref: 'Chat' 
  }]
}, 

  {versionKey: false}//should we do it?
);

module.exports = mongoose.model('User', userSchema); 