var apiResponse = require('express-api-response');
var appRepository = require('../../repositories/appRepository');
var userRepository = require('../../repositories/userRepository');
var supportRepository = require('../../repositories/supportRepository');

module.exports = function(app) {

	app.get('/api/apps/:id', function(req, res, next) {
		appRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/apps/', function(req, res, next) {
		appRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/apps/:id', function(req, res, next) {
		appRepository.update(req.params.id, req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/apps/:id', function(req, res, next) {
		appRepository.delete(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/apps/', function(req, res, next) {
		appRepository.getAll(function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/apps/:id/users/', function(req, res, next) {
		userRepository.getUsersOfApp(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/apps/:id/supports/', function(req, res, next) {
		supportRepository.getSupportsOfApp(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

};
