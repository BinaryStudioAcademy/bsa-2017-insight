const faqRepository = require('../../repositories/faqRepository');

module.exports = (app) => {
  app.get('/api/faq/', (req, res) => {
    if (!req.user) return res.status(204).end();
    faqRepository.getAll(req.user.appId, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.get('/api/faq/:id', (req, res) => {
    const id = req.params.id;
    faqRepository.findOneAndPopulate(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.post('/api/faq/', (req, res) => {
    faqRepository.add(req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(201).json(data);
      }
    });
  });

  app.put('/api/faq/:id', (req, res) => {
    faqRepository.update(req.params.id, req.body, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.delete('/api/faq/:id', (req, res) => {
    const id = req.params.id;
    faqRepository.delete(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });
};

