var apiResponse = require('express-api-response');
var convParticipantsRepository = require('../../repositories/convParticipantsRepository');

module.exports = function(app) {

	app.get('/api/convParticipants/:id', function(req, res, next) {
		convParticipantsRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/convParticipants/', function(req, res, next) {
		convParticipantsRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/convParticipants/:id', function(req, res, next) {
		convParticipantsRepository.update(req.params.id, req.body ,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.delete('/api/convParticipants/:id', function(req, res, next) {
		convParticipantsRepository.delete(req.params.id,function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);


	app.get('/api/convParticipants/',function (req,res,next) {
		convParticipantsRepository.getAll(function (err,data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
};
