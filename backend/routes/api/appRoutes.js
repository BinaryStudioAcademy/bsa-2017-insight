// const passport = require('passport');
const adminRepository = require('../../repositories/adminRepository');
const appRepository = require('../../repositories/appRepository');
const mailchimpSettingsRepository = require('../../repositories/mailchimpSettingsRepository');
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

  app.post('/api/apps/', upload.single('avatar'), (req, res, next) => {
    if (req.user) return res.redirect('/');

    const generalAdminData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.secondPassword,
      email: req.body.email,
      avatar: req.file ? req.file.filename : 'avatar.png',
      username: req.body.username,
      isAdmin: true,
      isSuperUser: true,
      isServiceAdmin: req.body.appName === 'InSight',
      verified: true,
      moderator: true,
    };
    const appData = {
      name: req.body.appName,
      url: req.body.appUrl,
      description: req.body.appDescription,
      isActive: req.body.appName === 'InSight',
    };

    adminRepository.getByUsername(generalAdminData.username, (admin1Err, admin1Data) => {
      if (admin1Err) return next(admin1Err);
      if (admin1Data) return res.json({ text: 'User with this username exists' });

      adminRepository.add(generalAdminData, (admin2Err, admin2Data) => {
        if (admin2Err) return next(admin2Err);
        appData.generalAdmin = admin2Data._id;
        appRepository.add(appData, (appErr, createdAppData) => {
          if (appErr) return next(appErr);
          adminRepository.update(admin2Data._id, { $set: { appId: createdAppData._id } }, (admin3Err, admin3Data) => {
            if (admin3Err) return next(admin3Err);
            mailchimpSettingsRepository.add({ appId: createdAppData._id }, (mailchimpErr, mailchimpData) => {
              if (mailchimpErr) return next(mailchimpErr);
              res.redirect('/admin/login');
            });
          });
        });
      });
    });
  });

  app.get('/api/apps/', (req, res) => {
    appRepository.getAll((err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.get('/api/apps/:id', (req, res) => {
    const id = req.params.id;
    appRepository.findOneAndPopulate(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.put('/api/apps/:id', (req, res) => {
    const id = req.params.id;
    appRepository.update(id, req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.put('/api/apps/:id/toggle', (req, res) => {
    const id = req.params.id;
    appRepository.toggleActiveState(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });
};
