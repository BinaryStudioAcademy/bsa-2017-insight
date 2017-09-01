const statisticsRepository = require('../repositories/statisticsRepository');

function getFilteredUsers(conditions, callback) {
  const query = {};
  const userquery = [];
  Object.keys(conditions).forEach((condition) => {
    const value = conditions[condition];
    if (value.includes('username')) {
      userquery[userquery.length] = ['username', value.split('*HAS*')[1]];
    } else if (value.includes('firstname')) {
      userquery[userquery.length] = ['firstName', value.split('*HAS*')[1]];
    } else if (value.includes('lastname')) {
      userquery[userquery.length] = ['lastName', value.split('*HAS*')[1]];
    } else if (value.includes('*HAS*')) {
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
    let statsFiltered = null;
    if (userquery.length > 0) {
      statsFiltered = stats.filter((el) => {
        let search = null;
        search = userquery.map((e) => {
          return el.userId[e[0]] === e[1];
        });
        return search.every(item => item === true);
      });
    }
    if (!err && stats) {
      callback(err, statsFiltered || stats);
    } else if (!stats) {
      callback();
    } else {
      callback(err);
    }
  });
}

module.exports = getFilteredUsers;
