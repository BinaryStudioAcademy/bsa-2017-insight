var jsonwebtoken = require('jsonwebtoken'),
    tokenSecret = require('../config/token').secret,
    Cookies = require('cookies'),
    userRepository = require('../repositories/userRepository'),
    userService = require('../services/userService');

module.exports = function(req, res, next) {
    var cookies = new Cookies(req, res),
        token = cookies.get('x-access-token'),
        getReadyForCreateUser = getReadyForCreateUser;

    if (req.session.user) {
        var id = req.session.user._id
        userRepository.getById(id, function(err, data) {
            req.session.user = data;
            next();
        });
    } else {
        if (token) {
            jsonwebtoken.verify(token, tokenSecret, function(err, decoded) {
                if (err) {
                    res.status(403).send({
                        success: false,
                        message: "Failed to authenticate user"
                    });
                } else {
                    var email = decoded.email;
                    userRepository.getUserByEmail(email, function(err, data) {
                        if (data) {
                            req.session.user = data;
                        } else {
                            var userData = getReadyForCreateUser(email);
                            userService.addItem(userData, function(err, data) {
                                req.session.user = data;
                                next();
                            });
                        }
                        next();
                    });

                }
            });
        } else {
            // res.status(403).send({success: false, message: "No Token Provided"});
            res.redirect('http://team.binary-studio.com/auth/#/')
        }
    }

    function getReadyForCreateUser(email) {
        var fullName = email.substring(0, email.indexOf('@')),
            preparedData = {
                email: email
            };

        if (fullName.indexOf('.') !== -1) {
            var tmpName = fullName.split('.');
            preparedData.firstName = tmpName[0];
            preparedData.lastName = tmpName[1];
        } else {
            preparedData.firstName = fullName;
            preparedData.lastName = 'UnknownSurname';
        }

        return preparedData;

    }

};