const userRepository = require('../repositories/userRepository');
const adminRepository = require('../repositories/adminRepository');
const conversationRepository = require('../repositories/conversationRepository');
const mongoose = require('mongoose');
const async = require('async');

const parseQuery = (query, callback) => {
  async.waterfall([
    function(done) {
      const parsed = {
        $project: {
          participants: 1,
          messages: 1,
          open: 1,
          createdAt: 1,
          appId: 1,
          messagesCount: { $size: '$messages' },
          participantsCount: { $size: '$participants' },
          isReassigned: 1,
        },
        $match: { messagesCount: { $gt: 0 }, appId: mongoose.Types.ObjectId(query.appId) }
      };
      if(query.username) {
        userRepository.getByUsername(query.username, (err, user) => {
          if(err) return done(err);
          if(!user) {
            return adminRepository.getByUsername(query.username, (err, user) => {
              if(err) return done(err);
              if(!user) return done(new Error(), null);

              parsed.$match["participants.user"] = user._id;
              done(null, parsed);
            });
          }

          parsed.$match["participants.user"] = user._id;
          done(null, parsed);
        });
      } else if(query.email) {
        userRepository.getByEmail(query.email, (err, user) => {
          if(err) return done(err);
          if(!user) return done(new Error(), null);

          parsed.$match["participants.user"] = user._id;
          done(null, parsed);
        });
      } else {
        done(null, parsed);
      }
    },
    function(parsed, done) {
      if(query.date) {
        debugger;
        if (query.date.from && !query.date.to) {
          parsed.$match.createdAt = {
            $gte: new Date(query.date.from),
          };
        } else if (!query.date.from && query.date.to) {
          parsed.$match.createdAt = {
            $lte: new Date(query.date.to),
          };
        } else if (query.date.from && query.date.to) {
          parsed.$match.createdAt = {
            $gte: new Date(query.date.from),
            $lte: new Date(query.date.to),
          };
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
        parsed.$match.open = query.open === 'true' ? true : false;
      }

      done(null, parsed);
    },
    function(parsed, done) {
      parsed.$sort = {};
      if(query.sort) {
        parsed.$sort.createdAt = query.sort === "new" ? -1 : 1;
      } else {
        parsed.$sort.createdAt = -1;
      }
      done(null, parsed);
    },
    function(parsed, done) {
      if(query.limit) {
        parsed.$limit = +query.limit;
      }
      done(null, parsed);
    },
    function(parsed, done) {
      if(query.activeGroup === 'mine') {
        parsed.$match["participants.user"] = query.admin._id;
      } else if(query.activeGroup === 'unpicked') {
        parsed.$match.participantsCount = 1;
      }
      done(null, parsed);
    }
    ], 
    function(err, parsed) {
      if(err || !parsed) return callback(err, parsed);

      let parsedArr = [];
      let keys = Object.keys(parsed);
      keys.forEach(function(item, i, arr) {
        parsedArr.push({ [item]: parsed[item]});
      });

      callback(err, parsedArr);
  });
};

function fetchConversations(query, callback) {
  conversationRepository.model.aggregate(query, callback);
}

function populateConversations(conversations, callback) {
  conversationRepository.model.populate(conversations, 
    [
      { 
        path: 'messages',
        populate: { path: 'author.item', select: 'firstName lastName username avatar'},
      },
      { 
        path: 'participants.user',
      }
    ],
    callback);
}

module.exports = {
  parseQuery,
  fetchConversations,
  populateConversations,
}