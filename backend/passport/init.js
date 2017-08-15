// const login = require('./login');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../repositories/adminRepository');
const User = require('../repositories/userRepository');

module.exports = function(passport){

  passport.use('admin', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    // console.log('username '+username);
    Admin.getAdminByName(username,
      function(err, user) {
        // console.log('local strategy', err, user);
        if (err)
          return done(err);
        if (!user) {
          return done(null, false, req.flash('message', 'Admin not found.'));
        }
        return done(null, user);
      }
    );
  }));

  passport.use('user', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    // console.log('username '+username);
    User.getUserByName(username,
      function(err, user) {
        // console.log('local strategy', err, user);
        if (err)
          return done(err);
        if (!user) {
          return done(null, false, req.flash('message', 'User not found.'));
        }
        return done(null, user);
      }
    );
  }));

  passport.serializeUser(function(user, done) {
    console.log('serializeUser ' + user);
    const data = {
      id: user._id,
      isAdmin: user.isAdmin
    };
    done(null, data);
  });

  passport.deserializeUser(function(data, done) {
    console.log('deserializeUser ' + data);
    if (data) {
      if (data.isAdmin) {
        Admin.getById(data.id, function (err, user) {
          done(err, user);
        });
      } else {
        User.getById(data.id, function (err, user) {
          done(err, user);
        });
      }
    }
  });
}