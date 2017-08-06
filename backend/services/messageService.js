var async = require('async');
var messageRepository = require('../repositories/messageRepository');

module.exports = function (id, onResult) {
    let resData = {};
    async.waterfall([
            function (callback) {
                messageRepository.add(id, function (err, data) {
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
                messageRepository.add(id, function (err, data) {
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