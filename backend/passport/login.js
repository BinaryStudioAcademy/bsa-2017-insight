const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Admin = require('../repositories/adminRepository');

passport.use(new LocalStrategy({
  passReqToCallback : true
},
function(req, username, password, done) {
  Admin.getAdminByName(username,
    function(err, user) {
      if (err)
        return done(err);
      if (!user) {
        return done(null, false, req.flash('message', 'Admin Not found.'));
      }
      return done(null, user);
    }
  );
})
);

