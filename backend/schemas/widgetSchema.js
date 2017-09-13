const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const insightHost = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'http://localhost:3001';

const widgetSchema = new Schema({
  appId: { type: Schema.Types.ObjectId, required: false }, // CHANGE TO "TRUE" LATER
  options: {
    widgetPosition: { type: String, default: 'right' },
    primaryColor: { type: String, default: '#D91111' },
    backgroundImage: { type: String, default: `${insightHost}/frontend/src/common/resources/wallpapers/w1` },
  },
});

module.exports = mongoose.model('Widget', widgetSchema);
