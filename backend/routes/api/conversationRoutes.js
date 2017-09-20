const conversationRepository = require('../../repositories/conversationRepository');
const conversationService = require('../../services/conversationService');

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

  app.get('/api/conversations/count', (req, res, next) => {
    conversationService.countConversationsByGroups({ id: req.user._id, appId: req.user.appId }, (err, result) => {
      if(err) {
        return next(err);
      }
      res.json(result);
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

  app.post('/api/conversations/pick', (req, res) => {
    conversationService.pickConversation(req.body.id, req.user._id, (err, result) => {
      if(err) {
        return res.json({ ok: false, message: err.message });
      }
      res.json({ ok: true });
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
