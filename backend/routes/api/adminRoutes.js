const passport = require('passport');
const adminRepository = require('../../repositories/adminRepository');

module.exports = function (app) {
  app.post('/api/admin/login/', passport.authenticate('admin', {
    successRedirect: '/admin',
    failureRedirect: '/admin/registration',
    failureFlash: true,
    successFlash: 'Welcome!',
  }));
  app.post('/api/admin/registration', (req, res) => {
    const data = {
      username: req.body.username,
      password: req.body.password,
      isAdmin: true,
    };
    console.log(`data username ${data.username}`);
    console.log(`data password ${data.password}`);
    adminRepository.add(data, () => {
      passport.authenticate('local')(req, res, () => {
        console.log('before redirect');
        res.redirect('/admin/login');
      });
    });
  });
};
