const conversationRepository = require('../../repositories/conversationRepository');
const filterService = require('../../services/conversationFilterService');

module.exports = (app) => {
  app.post('/api/conversations/filter', (req, res, next) => {
    req.body.appId = req.user.appId;
    req.body.admin = req.user;
    filterService.parseQuery(req.body, function(err, parsed) {
      if(err) return res.json([]);
      //if(!parsed) return res.json([]);

      filterService.fetchConversations(parsed, function(err, conversations) {
        if(err) return res.send(err.message);

        filterService.populateConversations(conversations, (err, result) => {
          if(err) return next(err);
          res.json(result);
        });
      });
    });
  });
}

// {
//   date: {
//     from: "2016-08-17",
//     to: "2016-08-18",
//     exact: "2017-08-17",
//     greater: "2017-08-17",
//     less: "2017-08-18"
//   },
//   username: "Anonymous",
//   email: "user@insight.com",
//   name: {
//     first: "FIRSTNAME",
//     last: "LASTNAME"
//   },
//   userType: "User",
//   open: true,
//   sort: "new",
//   limit: 10
// }