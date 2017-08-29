const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
	element: String,
	settings: Object
});

module.exports = mongoose.model('Setting', settingsSchema);