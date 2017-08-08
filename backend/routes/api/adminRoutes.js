//тут пока самые обычные роуты надо добавит на регистрацию, авторизацию, выход
let apiResponse = require('express-api-response');
let adminRepository = require('../../repositories/adminRepository');
var async = require('async');
var Admin = require('../../schemas/adminSchema');

module.exports = function(app) { 
    //этот запрос должен быть перенесен куда-то потом
    // app.get('/api/admin/login', function(req, res, next) {
    //         res.render("login"); //fronted page with login form
    //         res.err = err;
    //         next();
    // }, apiResponse);
    app.post('/api/admin/registration', function(req, res, next) {
        let email = req.body.email;
        let password = req.body.password;
        async.waterfall([
            function (callback) {
                Admin.findOne({ "email": email }, callback); 
            }, 
            function(admin, callback) {
                if(!admin) {
                    adminRepository.add(req.body, function(err, admin) {
                        res.admin = admin;
                        console.log("Admin successfully pass the registration");
                        callback(null, admin);
                    });
                } else {
                    console.log("This admin have already been registered");
                    res.redirect("/api/admin/login");
                }
            }
        ], function (err, admin) {
            res.admin = admin;
            res.err = err;
            res.redirect("/api/admin/login");
            next();
        });
    }, apiResponse);
    
    app.post('/api/admin/login', function(req, res, next) {
        let email = req.body.email;
        let password = req.body.password;
        async.waterfall([
            function (callback) {
                Admin.findOne({ "email": email }, callback); 
            }, 
            function(admin, callback) {
                if(admin) {
                    if (admin.checkPassword(password)) {
                        console.log("You are authorized successfully");
                        callback(null, admin);
                    } else {
                        console.log("password is invalid");
                        if (err) return next (err);
                    }
                } else {
                        console.log("No such admin was found");
                        res.redirect("/api/admin/registration");
                        next();
                }
            }
        ], function (err, admin) {
            req.session.admin = admin.globalId;
            res.admin = admin;
            res.err = err;
            next();
        });
    }, apiResponse);
    
    app.post('/api/admin/logout', function(req, res, next) {
        req.session.destroy();
        res.redirect("/");
        console.log("You are logout successfully");
    }, apiResponse);

    app.get('/api/admin/:id', function(req, res, next) {
        adminRepository.getById(req.params.id, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.post('/api/admin/', function(req, res, next) {
        adminRepository.add(req.body, function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.put('/api/admin/:id', function(req, res, next) {
        adminRepository.update(req.params.id, req.body ,function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);

    app.delete('/api/admin/:id', function(req, res, next) {
        adminRepository.delete(req.params.id,function(err, data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);


    app.get('/api/admin/',function (req,res,next) {
        adminRepository.getAll(function (err,data) {
            res.data = data;
            res.err = err;
            next();
        });
    }, apiResponse);
};
