var apiResponse = require('express-api-response');
var supportTypeRepository = require('../../repositories/supportTypeRepository');

module.exports = function(app) {

	app.get('/api/supporttype/:id', function(req, res, next) {
		supportTypeRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/supporttype/', function(req, res, next) {
		supportTypeRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/supporttype/:id', function(req, res, next) {
		supportTypeRepository.update(req.params.id, req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/supporttype/:id', function(req, res, next) {
		supportTypeRepository.delete(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/supporttype/', function(req, res, next) {
		supportTypeRepository.getAll(function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

};
