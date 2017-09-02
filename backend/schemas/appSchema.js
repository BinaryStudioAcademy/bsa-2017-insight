const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: String,
  description: String,
  isActive: {
    type: Boolean,
    default: false,
  },
  generalAdminId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Admin',
  },
});

module.exports = mongoose.model('App', appSchema);
