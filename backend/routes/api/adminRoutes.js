//тут пока самые обычные роуты надо добавит на регистрацию, авторизацию, выход

var apiResponse = require('express-api-response');
var adminRepository = require('../../repositories/adminRepository');

module.exports = function(app) {

    app.get('/api/admins/:id', function(req, res, next) {
        adminRepository.getById(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post('/api/admins/', function(req, res, next) {
        adminRepository.add(req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put('/api/admins/:id', function(req, res, next) {
        adminRepository.update(req.params.id, req.body ,function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete('/api/admins/:id', function(req, res, next) {
        adminRepository.delete(req.params.id,function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);


    app.get('/api/admins/',function (req,res,next) {
        adminRepository.getAll(function (err,data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
