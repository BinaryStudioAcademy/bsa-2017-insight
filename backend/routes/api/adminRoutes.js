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
      adminName: req.body.adminName,
      password: req.body.password,
    };
    console.log('data adminName '+data.adminName);
    console.log('data password '+data.password);
    adminRepository.add(data, () => {
      passport.authenticate('local')(req, res, function () {
        console.log('before redirect')
        res.redirect('/adminlogin');
      });
    });
  });
};
