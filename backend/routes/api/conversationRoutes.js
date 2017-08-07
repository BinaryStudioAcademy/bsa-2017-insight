const apiResponse = require('express-api-response');
// const conversationRepository = require('../../repositories/conversationRepository');

module.exports = function (app) {
	app.get('/api/conversations/', function(req, res, next) {
		// get all conv.
	}, apiResponse);

	app.get('/api/conversations/:id', function(req, res, next) {
		// get conv. by id
	}, apiResponse);

	app.post('/api/conversations/', function(req, res, next) {
		// add new conv.
	}, apiResponse);

	app.put('/api/conversations/:id', function(req, res, next) {
		// update conv. by id
	}, apiResponse);

	app.delete('/api/conversations/:id', function(req, res, next) {
		// delete conv. by id
	}, apiResponse);

}