var async = require('async');
var chatRepository = require('../repositories/chatRepository');

module.exports = function (id, onResult) {
    let resData = {};
    async.waterfall([
            function (callback) {
                chatRepository.add(id, function (err, data) {
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
                chatRepository.add(id, function (err, data) {
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