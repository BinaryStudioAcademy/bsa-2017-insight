var apiResponse = require('express-api-response');
var messageRepository = require('../../repositories/messageRepository');

module.exports = function(app) {

	app.get('/api/messages/:id', function(req, res, next) {
		messageRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/messages/', function(req, res, next) {
		messageRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/messages/:id', function(req, res, next) {
		messageRepository.update(req.params.id, req.body ,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/messages/:id', function(req, res, next) {
		messageRepository.delete(req.params.id,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.get('/api/messages/',function (req,res,next) {
		messageRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
};
