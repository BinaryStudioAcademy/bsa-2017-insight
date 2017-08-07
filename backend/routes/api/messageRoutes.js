const apiResponse = require('express-api-response');
// const messageRepository = require('../../repositories/messageRepository');

module.exports = function (app) {
	app.get('/api/conversations/:conversationId/messages/', function(req, res, next) {
		// get all messages
	}, apiResponse);

	app.get('/api/conversations/:conversationId/messages/:messageId', function(req, res, next) {
		// get message by id
	}, apiResponse);

	app.post('/api/conversations/:conversationId/messages/', function(req, res, next) {
		// add new message
	}, apiResponse);

}