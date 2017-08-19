const userRepository = require('../repositories/userRepository');
const async = require('async');

const parseQuery = (query, callback) => {
  async.waterfall([
    function(done) {
      const parsed = {
        $project: { participants: 1, messages: 1, open: 1, createdAt: 1},
        $match: {}
      };
      if(query.username) {
        userRepository.getByUsername(query.username, (err, user) => {
          if(err) return done(err);
          if(!user) return done(new Error('Conversations not found'));

          parsed.$match["participants.user"] = user._id;
          done(null, parsed);
        });
      } else if(query.email) {
        userRepository.getByEmail(query.email, (err, user) => {
          if(err) return done(err);
          if(!user) return done(new Error('Conversations not found'));

          parsed.$match["participants.user"] = user._id;
          done(null, parsed);
        });
      } else {
        done(null, parsed);
      }
    },
    function(parsed, done) {
      if(query.date) {
        if(query.date.range) {
          parsed.$match.createdAt = {
            $gte: new Date(query.date.range.from),
            $lte: new Date(query.date.range.to)
          }
        } else if (query.date.exact) {
          const date = new Date(query.date.exact);
          
          parsed.$project.month = { $month: "$createdAt" };
          parsed.$project.year = { $year: "$createdAt" };
          parsed.$project.day = { $dayOfMonth: "$createdAt" };

          parsed.$match.month = date.getMonth()+1;
          parsed.$match.day = date.getDate();
          parsed.$match.year = date.getFullYear();
        } else if (query.date.greater || query.date.less) {
          if(query.date.greater) {
            parsed.$match.createdAt = {
              $gt: new Date(query.date.greater)
            }
          } else {
            parsed.$match.createdAt = {
              $lt: new Date(query.date.less)
            }
          }
        }
      }

      done(null, parsed);
    },
    function(parsed, done) {
      if(query.open !== undefined) {
        parsed.$match.open = query.open;
      }

      done(null, parsed);
    },
    function(parsed, done) {
      if(query.sort) {
        parsed.$sort = {};
        parsed.$sort.createdAt = query.sort === "new" ? -1 : 1;
      }

      done(null, parsed);
    },
    function(parsed, done) {
      if(query.limit) {
        parsed.$limit = query.limit;
      }

      done(null, parsed);
    },
    function(parsed, done) {
      if(query.userType) {
        parsed.$match["participants.userType"] = query.userType;
      }

      done(null, parsed);
    }
    ], 
    function(err, parsed) {
      let parsedArr = [];
      let keys = Object.keys(parsed);

      keys.forEach(function(item, i, arr) {
        parsedArr.push({ [item]: parsed[item]});
      });

      callback(err, parsedArr);
  });

};

module.exports = {
  parseQuery
}