const async = require('async');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const userRepository = require('../../repositories/userRepository');
const adminRepository = require('../../repositories/adminRepository');
const emailService = require('../../services/emailService');

module.exports = function (app) {
  app.post('/api/forgot', (req, res, next) => {
    const email = req.body.email;
    const Repository = req.body.userType === 'admin' ? adminRepository : userRepository;

    if (!email) {
      return res.json({ text: 'Please, enter a valid email address' });
    }

    async.waterfall([
      function (done) {
        crypto.randomBytes(15, (err, buffer) => {
          const token = buffer.toString('hex');
          done(err, token);
        });
      },
      function (token, done) {
        Repository.getByEmail(email, (err, user) => {
          if (err) return done(err);
          if (!user) {
            return res.json({ text: 'No account with that email address exists' });
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000;

          user.save((err) => {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        const userType = user.isAdmin ? 'admin' : 'user';
        const mailOptions = {
          to: user.email,
          subject: 'Reset Password',
          text: `
            To reset the password click on the following link:
            ${global.insightHost}/api/reset/${userType}/${token}
          `,
        };

        emailService.send(mailOptions, (err) => {
          done(err);
        });
      },
    ], (err) => {
      if (err) return next(err);
      res.json({ text: 'ok' });
    });
  });

  app.get('/api/reset/:userType/:token', (req, res, next) => {
    const Repository = req.params.userType === 'admin' ? adminRepository : userRepository;
    Repository.getByToken({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() } },
    (err, user) => {
      if (!user) {
        return res.redirect('/reset/invalidtoken');
      }
      return res.redirect(`/reset/${req.params.userType}/${req.params.token}`);
    });
  });

  app.post('/api/reset/:userType/:token', (req, res, next) => {
    const Repository = req.params.userType === 'admin' ? adminRepository : userRepository;
    if (!req.body.password) return res.json({ text: 'Invalid password' });
    async.waterfall([
      function (done) {
        Repository.getByToken({
          resetPasswordToken: req.params.token,
          resetPasswordExpires: { $gt: Date.now() },
        }, (err, user) => {
          if (!user) {
            return res.redirect('/reset/invalidtoken');
          }

          const salt = bcrypt.genSaltSync(10);

          bcrypt.hash(req.body.password, salt, null, (err, hashed) => {
            if (err) return done(err);
            user.salt = salt;
            user.password = hashed;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save((err) => {
              done(err, user);
            });
          });
        });
      },
      function (user, done) {
        const mailOptions = {
          to: user.email,
          subject: 'Password changed',
          text: 'The password has been successfully changed',
        };

        emailService.send(mailOptions, (err) => {
          done(err);
        });
      },
    ], (err) => {
      if (err) return next(err);
      req.logout();
      if (req.params.userType === 'admin') {
        return res.redirect('/admin/login');
      }
      return res.redirect('/login');
    });
  });
};
