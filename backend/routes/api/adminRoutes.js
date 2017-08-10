const apiResponse = require('express-api-response');
const express = require('express');
const passport = require('passport');
const adminRepository = require('../../repositories/adminRepository');
// const Admin = require('../../schemas/adminSchema');
const app = express();

module.exports = function (app) {
  app.post('/api/admin/login/', 
    passport.authenticate('local', {
      successRedirect: '/admin',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: 'Welcome!' 
    })
  )
  app.post('/api/admin/register', function(req, res) {
    var data = {
      username: req.body.username,
      password: req.body.password
    };
    adminRepository.add(data, () => {
      passport.authenticate('local')(req, res, function () {
          console.log('before redirect')
          res.redirect('/adminlogin');
        });
      });
    }
  );
};
