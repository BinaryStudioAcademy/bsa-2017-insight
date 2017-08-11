const apiResponse = require('express-api-response');
const express = require('express');
const passport = require('passport');
const userRepository = require('../../repositories/userRepository');
const app = express();

module.exports = function (app) {
  app.post('/api/user/login/',
    passport.authenticate('user', {
      successRedirect: '/user',
      failureRedirect: '/userregistration',
      failureFlash: true,
      successFlash: 'Welcome!',
    })
  )
  app.post('/api/user/registration', function(req, res) {
    var data = {
      username: req.body.username,
      password: req.body.password,
    };
    userRepository.add(data, () => {
      passport.authenticate('local')(req, res, function () {
        console.log('before redirect')
        res.redirect('/userlogin');
      });
    });
  });
};
