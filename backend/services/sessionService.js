var async = require('async');
var sessionRepository = require('../repositories/sessionRepository');

module.exports = function (id, onResult) {
    let resData = {};
    async.waterfall([
            function (callback) {
                sessionRepository.add(id, function (err, data) {
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
                sessionRepository.add(id, function (err, data) {
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