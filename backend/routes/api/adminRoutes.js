const apiResponse = require('express-api-response');
const express = require('express');
const passport = require('passport');
const Admin = require('../../schemas/adminSchema');
const app = express();


module.exports = function(app) {

    app.get('/', (req, res) => {
        res.render('index', { user : req.user });
    }, apiResponse);

    app.get('/register', (req, res) => {
        res.render('register', { });
    }, apiResponse);

    app.post('/register', (req, res, next) => {
        Admin.register(new Admin({ username : req.body.username }), req.body.password, (err, Admin) => {
            if (err) {
              return res.render('register', { error : err.message });
            }

            passport.authenticate('local')(req, res, () => {
                req.session.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }, apiResponse);


    app.get('/login', (req, res) => {
        res.render('login', { user : req.user, error : req.flash('error')});
    }, apiResponse);

    app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    }, apiResponse);

    app.get('/logout', (req, res, next) => {
        req.logout();
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    }, apiResponse);
}
