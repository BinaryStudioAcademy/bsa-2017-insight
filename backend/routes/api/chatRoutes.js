var apiResponse = require('express-api-response');
var chatRepository = require('../../repositories/chatRepository');

module.exports = function(app) {

	app.get('/api/chats/:id', function(req, res, next) {
		chatRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/chats/', function(req, res, next) {
		chatRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/chats/:id', function(req, res, next) {
		chatRepository.update(req.params.id, req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/chats/:id', function(req, res, next) {
		chatRepository.delete(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.get('/api/chats/', function (req,res,next) {
		chatRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
};
