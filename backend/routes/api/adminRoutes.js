const passport = require('passport');
const adminRepository = require('../../repositories/adminRepository');

module.exports = function (app) {
  app.put('/api/admins/:id', (req, res) => {
    const id = req.params.id;
    adminRepository.update(id, req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });
  app.post('/api/admin/login/', passport.authenticate('admin', {
    successRedirect: '/admin',
    failureRedirect: '/adminregistration',
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
        res.redirect('/adminlogin');
      });
    });
  });
};
