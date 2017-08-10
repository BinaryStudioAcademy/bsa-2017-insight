const apiResponse = require('express-api-response');
const express = require('express');
const passport = require('passport');
const Admin = require('../../repositories/adminRepository');
// const Admin = require('../../schemas/adminSchema');
const app = express();

module.exports = function (app) {
  app.post('/login', 
    passport.authenticate('local', {
      successRedirect: '/hello',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: 'Welcome!' 
    })
  )
  app.post('/register', function(req, res) {
    var data = {
                username: req.body.username,
                password: req.body.password
              };
    Admin.add(data);

        passport.authenticate('local')(req, res, function () {
          // res.redirect('/');
        });
    });
};
