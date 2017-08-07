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
        req.body.users =  req.body.users.split(",")
		chatRepository.createChat(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.get('/api/chats/',function (req,res,next) {
		chatRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
};
