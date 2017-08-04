var async = require('async');
var userRepository = require('../repositories/userRepository');

module.exports = function (id, onResult) {
    let resData = {};
    async.waterfall([
            function (callback) {
                userRepository.add(id, function (err, data) {
                    if (err) {
                        return callback(err, data);
                    }
                    if (data) {
                        resData.features = data.features;
                        callback(null, resData);
                    }
                });
            },
            function (data, callback) {
                userRepository.add(id, function (err, data) {
                    if (err) {
                        return callback(err, data);
                    }
                    if (data) {
                        resData.features = data.features;
                        callback(null, resData);
                    }
                });
            }
        ],
        function (err, result) {
            onResult(err, result);
        });
};