const statisticsRepository = require('../repositories/statisticsRepository');

function getFilteredUsers(conditions, callback) {
  const query = {};
  Object.keys(conditions).forEach((condition) => {
    const value = conditions[condition];
    if (value.includes('*HAS*')) {
      if (value.includes('*AND*')) {
        query[condition] = { $in: value.split('*HAS*')[1].split('*OR*') };
      } else {
        query[condition] = { $all: value.split('*HAS*')[1].split('*AND*') };
      }
    } else if (value.includes('*MIN*') && value.includes('*MAX*')) {
      const boundaries = value.split(/(\*MIN\*|\*MAX\*)/);
      query[condition] = { $gte: boundaries[2], $lte: boundaries[4] };
    } else if (value.includes('*MIN*')) {
      const boundaries = value.split(/(\*MIN\*)/);
      query[condition] = { $gte: boundaries[2] };
    } else if (value.includes('*MAX*')) {
      const boundaries = value.split(/(\*MAX\*)/);
      query[condition] = { $lte: boundaries[2] };
    } else if (value.includes('*OR*')) {
      query[condition] = { $in: value.split('*OR*') };
    } else if (value.includes('*INCLUDES*')) {
      const regexObj = new RegExp(value.split('*INCLUDES*')[1], 'gi');
      query[condition] = { $regex: regexObj };
    } else {
      query[condition] = value;
    }
  });
  statisticsRepository.findByConditions(query, (err, stats) => {
    if (!err && stats) {
      callback(err, stats);
    } else if (!stats) {
      callback();
    } else {
      callback(err);
    }
  });
}

module.exports = getFilteredUsers;
