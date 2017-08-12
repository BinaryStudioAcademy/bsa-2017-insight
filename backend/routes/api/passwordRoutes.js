const async = require('async');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const userRepository = require('../../repositories/userRepository');
const emailService = require('../../services/emailService');

module.exports = function(app) {
  app.post('/api/forgot', function(req, res, next) {
    const email = req.body.email;
    
    if(!email) {
      return res.json({ text: 'Please, enter a valid email address' })
    };

    async.waterfall([
      function(done) {
        crypto.randomBytes(15, function(err, buffer) {
          const token = buffer.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        userRepository.getByEmail(email, function(err, user) {
          if(err) return done(err);
          if(!user) {
            return res.json({ text: 'No account with that email address exists' });
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000;

          user.save(function(err) {
            done(err, token, user);
          });

        });
      },
      function(token, user, done) {
        console.log(user);
        const mailOptions = {
          to: user.email,
          subject: 'Reset Password',
          text: `
            To reset the password click on the following link:
            http://localhost:3000/api/reset/${token} 
          `,
        };

        emailService.send(mailOptions, function(err) {
          done(err);
        });
      }
    ], function(err) {
        if(err) return next(err);
        res.json({ text: 'Instructions sent on your email'});
    });
  });

  app.get('/api/reset/:token', function(req, res, next) {
    userRepository.getByToken({ 
      resetPasswordToken: req.params.token, 
      resetPasswordExpires: { $gt: Date.now() } }, 
      function(err, user) { 
        if(!user) {
          return res.redirect('/invalidtoken');
        } else {
          return res.redirect('/reset/' + req.params.token);
        }

    });
  });

  app.post('/api/reset/:token', function(req, res, next) {
    if(!req.body.password) return res.json({ text: 'Invalid password' });
    async.waterfall([
      function(done) {
        userRepository.getByToken({
          resetPasswordToken: req.params.token,
          resetPasswordExpires: { $gt: Date.now() }
        }, function(err, user) {
          if(!user) {
            return res.redirect('/invalidtoken');
          };

          bcrypt.hash(req.body.password, 10, function(err, hashed) {
            if(err) return done(err);
            user.password = hashed;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              done(err, user);
            });
          });
        });
      },
      function(user, done) {
        const mailOptions = {
          to: user.email,
          subject: 'Password changed',
          text: 'The password has been successfully changed'
        };

        emailService.send(mailOptions, function(err) {
          done(err);
        });
      }
    ], function(err) {
      if(err) return next(err);
      return res.redirect('/login');
    });
  });
};
