const Repository = require('./generalRepository');
const FAQ = require('../schemas/faqSchema');

const faqRepository = Object.create(Repository.prototype);
faqRepository.model = FAQ;

faqRepository.getAll = function (appId, callback) {
  const model = this.model;
  const query = model.find({ appId });
  query.exec(callback);
};

faqRepository.findOneAndPopulate = function (id, callback) {
  this.model.findById({ _id: id }).populate('faq').exec(callback);
};

module.exports = faqRepository;
