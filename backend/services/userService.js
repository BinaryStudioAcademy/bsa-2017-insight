const async = require('async');
const userRepository = require('../repositories/visitorRepository');

module.exports = function(id, onResult) {
  let resData = {};
  async.waterfall(
    [
      function (callback) {
        userRepository.add(id, (err, data) => {
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
        userRepository.add(id, (err, data) => {
          if (err) {
            return callback(err, data);
          }
          if (data) {
            resData.features = data.features;
            callback(null, resData);
          }
        });
      },
    ],
    (err, result) => {
      onResult(err, result);
    },
  );
};
