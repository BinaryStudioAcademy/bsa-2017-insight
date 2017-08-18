const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../repositories/adminRepository');
const User = require('../repositories/userRepository');
const Statistics = require('./../repositories/statisticsRepository');

module.exports = function (localPassport) {
  localPassport.use('admin', new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
    Admin.getByUsername(username, (err, admin) => {
      if (err) {
        return done(err);
      }
      if (!admin || !admin.checkPassword(password)) {
        return done(null, false, 'Admin not found');
      }
      return done(null, admin);
    });
  }));

  localPassport.use('user', new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
    User.getByUsername(username, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user || !user.checkPassword(password)) {
        return done(null, false, 'User not found');
      }
      done(null, user);
    });
  }));

  localPassport.serializeUser((user, done) => {
    const data = {
      id: user._id,
      isAdmin: user.isAdmin || false,
    };

    done(null, data);
  });

  localPassport.deserializeUser((user, done) => {
    if(user.isAdmin) {
      Admin.getById(user.id, function(err, user) {
        done(err, user);
      });
    } else {
      Statistics.getUserStatisticsAndPopulate(user.id, function(err, user) {
        debugger;
        done(err, user);
      });
    }
  });
};
