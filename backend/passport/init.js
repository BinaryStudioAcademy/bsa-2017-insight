const login = require('./login');
const passport = require('passport');
const Admin = require('../repositories/adminRepository');

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      Admin.getById(id, function (err, user) {
        done(err, user);
      });
    });
}