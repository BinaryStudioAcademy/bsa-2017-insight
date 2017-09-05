const passport = require('passport');
const User = require('../../repositories/userRepository');
const getFilteredUsers = require('./../../services/filteredUserService');
const createUserAndEmptyStatistics = require('./../../services/userService');
const multer = require('multer');
const mime = require('mime');
const randomstring = require('randomstring')

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

module.exports = (app) => {
  app.post('/api/user/login/', (req, res, next) => {
    if (req.user) return res.redirect('/');

    passport.authenticate('user', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.json({ text: info });
      }

      req.logIn(user, (err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    })(req, res, next);
  });

  app.post('/api/user/registration', upload.single('avatar'), (req, res, next) => {
    if (req.user) return res.redirect('/');

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: new Date(req.body.dateOfBirth),
      password: req.body.secondPassword,
      company: req.body.company,
      email: req.body.email,
      avatar: req.file ? req.file.filename : 'avatar.png',
      username: req.body.username,
      gender: req.body.gender,
    };

    User.getByUsername(data.username, (err, user) => {
      if (err) return next(err);
      if (user) return res.json({ text: 'User with this username exists' });

      createUserAndEmptyStatistics(data, (err) => {
        if (err) return next(err);
        res.redirect('/login');
      });
    });
  });

  app.get('/api/user/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/users/', (req, res) => {
    if (Object.keys(req.query).length === 0) { // If query has no GET params
      User.getAll((err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          res.status(200).json(data);
        }
      });
    } else {
      getFilteredUsers(req.query, (err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          res.status(200).json(data);
        }
      });
    }
  });

  app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    User.findOneAndPopulate(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.post('/api/users/', (req, res) => {
  if (!req.body.username) {
    req.body.username = `Anonymous#${randomstring.generate(6)}`
  }
    User.add(req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(201).json(data);
      }
    });
  });

  app.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    User.update(id, req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    User.delete(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });
};
