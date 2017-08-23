const passport = require('passport');
const adminRepository = require('../../repositories/adminRepository');
const multer = require('multer');
const mime = require('mime');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/../../../uploads/avatars`);
  },
  filename(req, file, cb) {
    const extension = mime.extension(file.mimetype);
    cb(null, `${req.body.username}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage });

module.exports = function (app) {
  // app.post('/api/admins/login/', passport.authenticate('admin', {
  //   successRedirect: '/admin',
  //   failureRedirect: '/admin/registration',
  //   failureFlash: true,
  //   successFlash: 'Welcome!',
  // }));
  // app.post('/api/admins/registration', (req, res) => {

  app.post('/api/admin/login/', (req, res, next) => {
    if (req.user) return res.redirect('/');

    passport.authenticate('admin', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.json({ text: info });
      }

      req.logIn(user, (err) => {
        if (err) return next(err);
        res.redirect('/admin');
      });
    })(req, res, next);
  });

  app.post('/api/admin/registration', upload.single('avatar'), (req, res, next) => {
    if (req.user) return res.redirect('/');

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.secondPassword,
      email: req.body.email,
      avatar: req.file ? req.file.filename : 'avatar.png',
      username: req.body.username,
      gender: req.body.gender,
      isAdmin: true,
    };
    console.log(`data username ${data.username}`);
    // adminRepository.add(data, () => {
    //   passport.authenticate('local')(req, res, () => {
    //     console.log('before redirect');
    //     res.redirect('/admin/login');

    adminRepository.getByUsername(data.username, (err, user) => {
      if (err) return next(err);
      if (user) return res.json({ text: 'User with this username exists' });

      adminRepository.add(data, (err) => {
        if (err) return next(err);
        res.redirect('/admin/login');
      });
    });
  });

  app.get('/api/admins/', (req, res) => {
    adminRepository.getAll((err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.get('/api/admins/:id', (req, res) => {
    const id = req.params.id;
    adminRepository.findOneAndPopulate(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.post('/api/admins/', (req, res) => {
    adminRepository.add(req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(201).json(data);
      }
    });
  });

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

  app.delete('/api/admins/:id', (req, res) => {
    const id = req.params.id;
    adminRepository.delete(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });
};
