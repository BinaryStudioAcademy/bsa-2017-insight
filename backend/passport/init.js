// const login = require('./login');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../repositories/adminRepository');
const User = require('../repositories/userRepository');

module.exports = function(passport){

  passport.use('admin', new LocalStrategy({
    adminNameField: 'adminName',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, adminName, password, done) {
    console.log('adminName '+adminName);
    Admin.getAdminByName(adminName,
      function(err, user) {
        if (err)
          return done(err);
        if (!user) {
          return done(null, false, req.flash('message', 'Admin not found.'));
        }
        return done(null, user);
      }
    );
  })
  );


/*  passport.use('user', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    User.getUserByName(username,
      function(err, user) {
        if (err)
          return done(err);
        if (!user) {
          return done(null, false, req.flash('message', 'User not found.'));
        }
        return done(null, user);
      }
    );
  })
  );*/


  passport.serializeUser(function(user, done) {
    console.log('serializeUser ' + user);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser ' + id);
    Admin.getById(id, function (err, user) {
      done(err, user);
    });
  });
  
/*  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getById(id, function (err, user) {
      done(err, user);
    });
  });*/
}