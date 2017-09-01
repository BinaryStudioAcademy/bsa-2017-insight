const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const widgetSchema = new Schema({
  website: String,
  options: {
    widgetPosition: { type: String, default: 'right' },
    primaryColor: { type: String, default: '#D91111' },
    backgroundImage: { type: String, default: 'http://localhost:3000/frontend/src/common/resources/wallpapers/w1' },
  },
});

module.exports = mongoose.model('Widget', widgetSchema);
