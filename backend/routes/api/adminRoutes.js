const apiResponse = require('express-api-response');
const express = require('express');
const passport = require('passport');
const adminRepository = require('../../repositories/adminRepository');
const app = express();

module.exports = function (app) {
  app.post('/api/admin/login/',
    passport.authenticate('admin', {
      successRedirect: '/admin',
      failureRedirect: '/adminregistration',
      failureFlash: true,
      successFlash: 'Welcome!',
    })
  )
  app.post('/api/admin/registration', function(req, res) {
    var data = {
      username: req.body.username,
      password: req.body.password,
      isAdmin: true
    };
    adminRepository.add(data, () => {
      passport.authenticate('local')(req, res, function () {
        console.log('before redirect')
        res.redirect('/adminlogin');
      });
    });
  });
};
