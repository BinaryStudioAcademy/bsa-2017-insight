const Widget = require('../schemas/widgetSchema');
const Repository = require('./generalRepository');

const widgetRepository = Object.create(Repository.prototype);
widgetRepository.model = Widget;

widgetRepository.findOneAndPopulate = function (id, callback) {
  this.model.findOne({ _id: id }).populate('admin').exec(callback);
};

widgetRepository.updateOrCreateByAdminId = function (id, data, callback) {
  const model = this.model;
  console.log('ATTENTION', data);
  model.update({ admin: id }, data, { upsert: true }).exec(callback);
};

widgetRepository.findByAdminId = function (id, callback) {
  this.model.findOne({ admin: id }).populate('admin').exec().then((data) => {
    if (data) {
      console.log('exec:', data);
      callback(null, data);
    } else {
      const widgetDefaultSettings = {
        primaryColor: '#D91111',
        backgroundImage: 'resources/wallpapers/w1',
        widgetPosition: 'right',
      };
      callback(null, widgetDefaultSettings);
    }
  });
};


module.exports = widgetRepository;
