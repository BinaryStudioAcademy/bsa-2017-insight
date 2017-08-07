const apiResponse = require('express-api-response');
// const sessionRepository = require('../../repositories/sessionRepository');

module.exports = function (app) {
	app.get('/api/sessions/', function(req, res, next) {
		// get all sessions
	}, apiResponse);

	app.get('/api/sessions/:id', function(req, res, next) {
		// get session by id
	}, apiResponse);

	app.post('/api/sessions/', function(req, res, next) {
		// add new session
	}, apiResponse);

	app.put('/api/sessions/:id', function(req, res, next) {
		// update session by id
	}, apiResponse);

	app.delete('/api/sessions/:id', function(req, res, next) {
		// delete session by id
	}, apiResponse);

}