var apiResponse = require('express-api-response');
var supportRepository = require('../../repositories/supportRepository');

module.exports = function(app) {

	app.get('/api/support/:id', function(req, res, next) {
		supportRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/support/', function(req, res, next) {
		supportRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/support/:id', function(req, res, next) {
		supportRepository.update(req.params.id, req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/support/:id', function(req, res, next) {
		supportRepository.delete(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.get('/api/support/', function (req,res,next) {
		supportRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
};
