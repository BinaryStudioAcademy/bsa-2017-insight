const userRepository = require('../repositories/userRepository');
const adminRepository = require('../repositories/adminRepository');
const messageRepository = require('../repositories/messageRepository');
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
          if(!user) return done(null, null);

          parsed.$match["participants.user"] = user._id;
          done(null, parsed);
        });
      } else if(query.email) {
        userRepository.getByEmail(query.email, (err, user) => {
          if(err) return done(err);
          if(!user) return done(null, null);

          parsed.$match["participants.user"] = user._id;
          done(null, parsed);
        });
      } else if (query.name) { 
        userRepository.getByFullName(query.name, (err, users) => {
          if(err) return done(err);
          if(!users.length) return done(null, null);

          let ids = users.map((user) => user._id);
          parsed.$match["participants.user"] = {
            $in: ids
          };
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
      if(err || !parsed) return callback(err, parsed);

      let parsedArr = [];
      let keys = Object.keys(parsed);
      keys.forEach(function(item, i, arr) {
        parsedArr.push({ [item]: parsed[item]});
      });

      callback(err, parsedArr);
  });
};

const populateWithData = (conversations, callback) => {
  const data = {
    users: [],
    admins: [],
    messages: []
  };

  conversations.forEach((conversation, index, conversations) => {
    const lastMessage = conversation.messages[conversation.messages.length-1];
    data.messages.push(lastMessage);

    conversation.participants.forEach((participant) => {
      if(participant.userType === "User") {
        data.users.push(participant.user);
      } else {
        data.admins.push(participant.user);
      }
    });
  });

  async.series({
    users: (done) => {
      userRepository.findByConditions({ _id: data.users }, (err, users) => {
        done(err, users);
      }, 'firstName lastName username');
    },
    admins: (done) => {
      adminRepository.findByConditions({ _id: data.admins }, (err, admins) => {
        done(err, admins);
      }, 'firstName lastName username');
    },
    messages: (done) => {
      messageRepository.findByConditions({ _id: data.messages }, (err, messages) => {
        done(err, messages);
      }, 'body createdAt author');
    }
  }, (err, retrievedData) => {
    if(err) return callback(err);

      conversations.forEach((conversation) => {
        conversation.messages.forEach((message) => {
          let index = retrievedData.messages.findIndex((msg) => {
            if(msg._id.toString() === message.toString()) return true;
          });
          if(!~index) return;
          conversation.messages = retrievedData.messages[index];
        });

        const participants = conversation.participants;
        conversation.participants = [];

        participants.forEach((participant) => {
          if(participant.userType === 'User') {
            let index = retrievedData.users.findIndex((user) => {
              if(participant.user.toString() === user._id.toString()) return true;
            });
            if(!~index) return;
            conversation.participants.push(retrievedData.users[index]);
          } else {
            let index = retrievedData.admins.findIndex((user) => {
              if(participant.user.toString() === user._id.toString()) return true;
            });
            if(!~index) return;
            conversation.participants.push(retrievedData.admins[index]);
          }
        });

      });

      callback(null, conversations);
  });

};

module.exports = {
  parseQuery,
  populateWithData
}