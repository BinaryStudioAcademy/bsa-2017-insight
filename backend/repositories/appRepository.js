const Repository = require('./generalRepository');
const App = require('../schemas/appSchema');

const appRepository = Object.create(Repository.prototype);
appRepository.model = App;

appRepository.findOneAndPopulate = function (id, callback) {
  this.model.findById({ _id: id }).populate('generalAdminId').exec(callback);
};

module.exports = appRepository;
