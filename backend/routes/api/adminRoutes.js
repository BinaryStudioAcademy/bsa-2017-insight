const async = require('async');
const apiResponse = require('express-api-response');
const express = require('express');
const passport = require('passport');
const adminRepository = require('../../repositories/adminRepository');
const chatRepository = require('../../repositories/chatRepository');
const app = express();

module.exports = function (app) {
  app.post('/api/admin/login/',
    passport.authenticate('admin', {
      successRedirect: '/admin',
      failureRedirect: '/adminregistration',
      failureFlash: true,
      successFlash: 'Welcome!',
    })
  )
  app.post('/api/admin/registration', function(req, res) {
    var data = {
      username: req.body.username,
      password: req.body.password,
      isAdmin: true
    };
    console.log('data username '+data.username);
    console.log('data password '+data.password);
    adminRepository.add(data, () => {
      passport.authenticate('local')(req, res, function () {
        console.log('before redirect')
        res.redirect('/adminlogin');
      });
    });
  });

  app.post('/api/admin/chatfilter', function(req, res, next) {
    var query = req.body;
    // console.log(req);


    var result = [];


    for(let key in query) {
      var val = query[key];
      console.log(val);

      switch (key) {
        case 'operator': {

          console.log('operator');
/*      function (err, admin) {
          res.admin = admin;
          res.err = err;
          res.redirect("/api/admin/login");
          next();
      }*/



          break;
        }
        case 'username': {
          console.log('username');
          break;
        }





        case 'status': {
          // console.log(val);

          async.waterfall([
            function (callback) {
              chatRepository.getStatus(val, function (err, foundstatus) {
                if (foundstatus) {
                  // adminRepository.add(req.body, function(err, admin) {
                  //     res.admin = admin;
                  console.log(foundstatus);
        // res.send(foundstatus);
                  // callback(null, admin);
                  // });
                } else {
                  console.log("not found");
                  // res.redirect("/api/admin/login");
                }
              })
            }
          ], function (err, foundstatus) {
            res.foundstatus = foundstatus;
            res.err = err;
            // res.redirect("/api/admin/login");
            next();
          });
          break;
        }






        case 'errorCode': {
          console.log('errorCode');
          break;
        }
        case 'date': {
          console.log('date');
          async.waterfall([
            function (callback) {
              chatRepository.getDate(val, function (err, founddate) {
                if (founddate) {
                  // adminRepository.add(req.body, function(err, admin) {
                  //     res.admin = admin;
                  console.log(founddate);
                  // res.send(founddate);
                  // callback(null, admin);
                  // });
                } else {
                  console.log("not found");
                  // res.redirect("/api/admin/login");
                }
              })
            }
          ], function (err, founddate) {
            res.founddate = founddate;
            res.err = err;
            // res.redirect("/api/admin/login");
            next();
          });
          break;
        }

        default: {
          
        }
      }



    }
  }, apiResponse);
};
