var apiResponse = require('express-api-response');
var sessionRepository = require('../../repositories/sessionRepository');

module.exports = function(app) {

    app.get('/api/sessions/:id', function(req, res, next) {
        sessionRepository.getById(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post('/api/sessions/', function(req, res, next) {
        sessionRepository.add(req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put('/api/sessions/:id', function(req, res, next) {
        sessionRepository.update(req.params.id, req.body ,function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete('/api/sessions/:id', function(req, res, next) {
        sessionRepository.delete(req.params.id,function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);


    app.get('/api/sessions/',function (req,res,next) {
        sessionRepository.getAll(function (err,data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
