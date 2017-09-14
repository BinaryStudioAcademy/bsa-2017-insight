const passport = require('passport');
const adminRepository = require('../../repositories/adminRepository');
const appRepository = require('../../repositories/appRepository');
const checkVerification = require('../../services/adminService');
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

  app.post('/api/admin/login/', (req, res, next) => {
    if (req.user) return res.redirect('/');
    checkVerification(req, (data) => {
      if (data) {
        adminRepository.getByUsername(data.username, (err, user) => {
          if (err) return next(err);
          if (user) return res.json({ text: 'Please, login as general admin' });
          adminRepository.add(data, (err) => {
            if (err) return next(err);
            res.json({ text: 'Please, login as general admin' });
          });
        });
      } else {
        passport.authenticate('admin', (err, user, info) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.json({ text: info });
          }
          appRepository.getById(user.appId, (err, app) => {
            if (err) return next(err);
            if (app.isActive === false) {
              return res.json({ text: 'Sorry, but your app is inactive. If you just added your app, please \
              wait for a few hours for moderation. Otherwise, contact our support.' });
            }
            req.logIn(user, (err) => {
              if (err) return next(err);
              res.redirect('/admin');
            });
          });
        })(req, res, next);
      }
    });
  });

  app.post('/api/admin/registration', upload.single('avatar'), (req, res, next) => {
    if (req.user) return res.redirect('/');

    const data = {
      appId: req.body.appId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.secondPassword,
      email: req.body.email,
      avatar: req.file ? req.file.filename : 'avatar.png',
      username: req.body.username,
      gender: req.body.gender,
      isAdmin: true,
      adminGroups: req.body.adminGroups.split(','),
    };
    console.log(`data username ${data.username}`);
    adminRepository.getByUsername(data.username, (err, user) => {
      if (err) return next(err);
      if (user) return res.json({ text: 'User with this username exists' });
      appRepository.getById(data.appId, (err, app) => {
        if (err) return next(err);
        if (!app) {
          return res.json({ text: 'App with such ID does not exist. \
          Please, contact another admin of the app to be provided with the correct App ID' });
        }
        adminRepository.add(data, (err) => {
          if (err) return next(err);
          res.redirect('/admin/login');
        });
      });
    });
  });

  app.get('/api/admin/logout', function(req, res, next) {
    req.logout();
    res.redirect('/admin/login');
  });

  app.get('/api/admins/', (req, res) => {
    if (!req.user) return res.status(204).end();
    adminRepository.getAllAdmins(req.user.appId, (err, data) => {
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

  app.post('/api/admins/search', (req, res, next) => {
    adminRepository.findByConditions({ $and: [{ username: { $regex: new RegExp(`^${req.body.username}`) } }, { username: { $ne: req.user.username } }, { adminGroups: { $in: [req.body.adminGroups] } }], appId: req.user.appId }, (err, data) => {
      if (err) {
        return next(err);
      }
      return res.json(data);
    })
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
