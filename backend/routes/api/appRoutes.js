var apiResponse = require('express-api-response');
var appRepository = require('../../repositories/appRepository');
// var userRepository = require('../../repositories/userRepository');

module.exports = function(app) {

	// APPS

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

	// USERS

	app.get('/api/apps/:id/users/:userid', function(req, res, next) {
		appRepository.getUser(req.params.userid, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/apps/:id/users/', function(req, res, next) {
		appRepository.addUser(req.params.id, req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/apps/:id/users/:userid', function(req, res, next) {
		appRepository.update(req.params.userid, req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/apps/:id/users/:userid', function(req, res, next) {
		appRepository.deleteUser(req.params.id, req.params.userid, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/apps/:id/users/', function(req, res, next) {
		appRepository.getAllUsers(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

};
