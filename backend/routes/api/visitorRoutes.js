const apiResponse = require('express-api-response');
const visitorRepository = require('../../repositories/visitorRepository');

// почему бы не использовать express.router? есть ли разница?

module.exports = (app) => {
  // Поскольку фронту (условному сайту, который подключил наш чат) и админке нужны для разных страниц разные данные
  // (статистика юзера без списка чатов или наоборот, только активный чат и собщения в нем, без статистики), - возможно
  // есть смысл добавить какое-нибудь query в uri get запросов, в котором бы уточнялся тип информации, который
  // необходим, чтобы не выдумывать лишних роутов. Типа: query="all",query="statistic", query="conversations".
  // Хз, как вариант.

  app.get('/api/visitors/', (req, res, next) => {
    visitorRepository.getAll((err, data) => {
      res.data = data;
      res.err = err;
      next();
    });
  }, apiResponse);

  app.get('/api/visitors/:id', (req, res, next) => {
    visitorRepository.findOneAndPopulate(req.params.id, (err, data) => {
      res.data = data;
      res.err = err;
      next();
    });
  }, apiResponse);

  app.post('/api/visitors/', (req, res, next) => {
    visitorRepository.add(req.body, (err, data) => {
      res.data = data;
      res.err = err;
      next();
    });
  }, apiResponse);

  // req.body.path - важно, упомянуть
  // "path": { "options.primaryColor": "blue" }  - так будет обновляться только одно поле, вместо всего вложенного
  // объекта

  app.put('/api/visitors/:id', (req, res, next) => {
    visitorRepository.update(req.params.id, req.body.path, (err, data) => {
      res.data = data;
      res.err = err;
      next();
    });
  }, apiResponse);


  app.delete('/api/visitors/:id', (req, res, next) => {
    visitorRepository.delete(req.params.id, (err, data) => {
      res.data = data;
      res.err = err;
      next();
    });
  }, apiResponse);
};
