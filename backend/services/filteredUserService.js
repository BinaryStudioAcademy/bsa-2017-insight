const mongoose = require('mongoose');
const userRepository = require('../repositories/userRepository');
const statisticsRepository = require('../repositories/statisticsRepository');

function getFilteredUsers(conditions, callback) {
  console.log('GET FILTERED USERSZZZZZZ')
  const query = {};
  Object.keys(conditions).forEach((condition) => {
    const value = conditions[condition];
    if (value.indexOf('*HAS*') !== -1) {
      if (value.indexOf('*AND*') === -1) {
        query[condition] = { $in: value.split('*HAS*')[1].split('*OR*') };
      } else {
        query[condition] = { $all: value.split('*HAS*')[1].split('*AND*') };
      }
    } else if (value.indexOf('*MIN*') !== -1 && value.indexOf('*MAX*') !== -1) {
      const boundaries = value.split(/(\*MIN\*|\*MAX\*)/);
      query[condition] = { $gte: boundaries[2], $lte: boundaries[4] };
    } else if (value.indexOf('*MIN*') !== -1) {
      const boundaries = value.split(/(\*MIN\*)/);
      query[condition] = { $gte: boundaries[2] };
    } else if (value.indexOf('*MAX*') !== -1) {
      const boundaries = value.split(/(\*MAX\*)/);
      query[condition] = { $lte: boundaries[2] };
    } else if (value.indexOf('*OR*') !== -1) {
      query[condition] = { $in: value.split('*OR*') };
    } else {
      query[condition] = value;
    }
  });
  statisticsRepository.findByConditions(query, (err, stats) => {
    if (!err && stats) {
      const userIds = stats.map(stat => new mongoose.Types.ObjectId(stat.userId));
      userRepository.findByConditions({ _id: { $in: userIds } }, (err, users) => {
        callback(err, users);
      });
    } else if (!stats) {
      callback();
    } else {
      callback(err);
    }
  });
}

module.exports = getFilteredUsers;
