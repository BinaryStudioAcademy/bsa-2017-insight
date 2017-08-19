const conversationRepository = require('../../repositories/conversationRepository');
const filterService = require('../../services/filterChatService');

module.exports = (app) => {
  app.post('/api/conversations/filter', (req, res, next) => {
    filterService.parseQuery(req.body.query, function(err, parsed) {
      if(err) return res.send('Conversations not found');
      conversationRepository.getByQuery(parsed, function(err, conversations) {
        if(err) return res.send(err.message);
        res.json(conversations);
      });
    })

  });
}

// {
//   date: {
//     range: { from: "2016-08-17" to: "2016-08-18" },
//     exact: "2017-08-17",
//     greater: "2017-08-17"
//     less: "2017-08-18"
//   },
//   username: "Anonymous",
//   email: "user@insight.com",
//   userType: "User"
//   open: true,
//   sort: "new",
//   limit: 10
// }