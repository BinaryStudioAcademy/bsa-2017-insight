var apiResponse = require('express-api-response');
var conversationRepository = require('../../repositories/conversationRepository');

module.exports = function(app) {

	app.get('/api/conversations/:id', function(req, res, next) {
		conversationRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/conversations/', function(req, res, next) {
		conversationRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/conversations/:id', function(req, res, next) {
		conversationRepository.update(req.params.id, req.body ,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/conversations/:id', function(req, res, next) {
		conversationRepository.delete(req.params.id,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.get('/api/conversations/',function (req,res,next) {
		conversationRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
};
