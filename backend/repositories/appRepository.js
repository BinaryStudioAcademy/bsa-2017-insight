const Repository = require('./generalRepository');
const App = require('../schemas/appSchema');

const appRepository = Object.create(Repository.prototype);
appRepository.model = App;

appRepository.findOneAndPopulate = function (id, callback) {
  this.model.findById(id)
    .populate('generalAdmin')
    .exec(callback);
};

appRepository.toggleActiveState = function (id, callback) {
  this.model.findById(id)
    .exec((err, data) => {
      if (err) console.log(err);
      else {
        this.model.update({_id: id}, {isActive: !data.isActive}, (err, data) => {
          this.model.findById(id)
            .exec(callback);
        });
      }
    });
};

module.exports = appRepository;
