const conversationRepository = require('../../repositories/conversationRepository');

module.exports = (app) => {
  app.get('/api/conversations/', (req, res) => {
    if (!req.user) return res.status(204).end();
    conversationRepository.getAllConversations(req.user.appId, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.get('/api/conversations/:id', (req, res) => {
    const id = req.params.id;
    conversationRepository.findOneAndPopulate(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.post('/api/conversations/', (req, res) => {
    conversationRepository.add(req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(201).json(data);
      }
    });
  });

  app.put('/api/conversations/:id', (req, res) => {
    const id = req.params.id;
    conversationRepository.update(id, req.body.path, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.delete('/api/conversations/:id', (req, res) => {
    const id = req.params.id;
    conversationRepository.delete(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });
};
