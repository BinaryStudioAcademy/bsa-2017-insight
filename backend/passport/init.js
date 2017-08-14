// const login = require('./login');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../repositories/adminRepository');
const User = require('../repositories/userRepository');
const Statistics = require('../repositories/statisticsRepository');

module.exports = function (localPassport) {
  localPassport.use('admin', new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
    console.log(`username ${username}`);
    Admin.getAdminByName(username, (err, user) => {
      console.log('local strategy', err, user);
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, req.flash('message', 'Admin not found.'));
      }
      return done(null, user);
    });
  }));

  localPassport.use('user', new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
    console.log(`username ${username}`);
    User.getUserByName(username, (err, user) => {
      console.log('local strategy', err, user);
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, req.flash('message', 'User not found.'));
      }
      return done(null, user);
    });
  }));

  localPassport.serializeUser((user, done) => {
    console.log(`serializeUser ${user}`);
    const data = {
      id: user._id,
      isAdmin: user.isAdmin,
    };
    done(null, data);
  });

  localPassport.deserializeUser((data, done) => {
    console.log(`deserializeUser ${data}`);
    if (data) {
      if (data.isAdmin) {
        Admin.getById(data.id, (err, user) => {
          done(err, user);
        });
      } else {
        Statistics.getUserStatisticsAndPopulate(data.id, (err, user) => {
          done(err, user);
        });
      }
    }
  });
};
