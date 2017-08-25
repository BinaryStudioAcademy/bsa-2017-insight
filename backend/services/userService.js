const userRepository = require('../repositories/userRepository');
const statisticsRepository = require('../repositories/statisticsRepository');
const bcrypt = require('bcrypt-nodejs');

function createUserAndEmptyStatistics(data, callback) {
  const userData = data;
  userData.salt = bcrypt.genSaltSync(10);
  bcrypt.hash(userData.password, userData.salt, null, (err, hash) => {
    if (err) return callback(err);
    userData.password = hash;
    userRepository.model.create(userData).then((newUserData) => {
      console.log(newUserData);
      const statisticsObj = { userId: newUserData._id };
      statisticsRepository.model.create(statisticsObj).then((statisticsData) => {
        console.log(statisticsData);
        callback(null, userData);
      });
    });
  });
}

module.exports = createUserAndEmptyStatistics;
