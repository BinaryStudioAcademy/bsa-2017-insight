const statisticsRepository = require('../../repositories/statisticsRepository');
const statisticsService = require('../../services/statisticsService');

module.exports = (app) => {
  app.get('/api/statistics/', (req, res) => {
    statisticsRepository.getAll((err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.get('/api/statistics/:id', (req, res) => {
    const id = req.params.id;
    statisticsRepository.getUserStatisticsAndPopulate(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });

  app.post('/api/statistics/', (req, res) => {
    statisticsService.parseStatisticsAndCreate(req.body).then((data) => {
      console.log('created successfully');
      res.status(200).json(data);
    }, (err) => {
      console.log(err);
      res.sendStatus(400);
    });
  });

  app.put('/api/statistics/:id', (req, res) => {
    statisticsService.parseStatisticsAndUpdate(req.body).then((data) => {
      console.log('updated successfully');
      res.status(200).json(data);
    }, (err) => {
      console.log(err);
      res.sendStatus(400);
    });
  });
  // statisticsRepository.findByVisitorId(id, req.body, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.sendStatus(400);
  //   } else {
  //     res.status(200).json(data);
  //   }
  // });


  app.delete('/api/statistics/:id', (req, res) => {
    const id = req.params.id;
    statisticsRepository.delete(id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.status(200).json(data);
      }
    });
  });
};
