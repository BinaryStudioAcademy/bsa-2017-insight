const userRepository = require('../repositories/userRepository');
const statisticsRepository = require('../repositories/statisticsRepository');
const bcrypt = require('bcrypt-nodejs');

function createUser(id, userData, callback) {
  if (id) {
    userRepository.addAnonymousUser(id).then((data) => {
      callback(data);
    });
  } else {
    userData.salt = bcrypt.genSaltSync(10);
    bcrypt.hash(userData.password, userData.salt, null, (err, hash) => {
      userData.password = hash;
      userRepository.model.create(userData).then((newUserData) => {
        console.log(newUserData);
        const statisticsObj = { userId: newUserData._id };
        statisticsRepository.model.create(statisticsObj).then((statisticsData) => {
          console.log(statisticsData);
          callback(userData);
        });
      });
    });
  }
}

module.exports = createUser;
