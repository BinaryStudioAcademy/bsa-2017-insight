const Widget = require('../schemas/widgetSchema');
const Repository = require('./generalRepository');

const widgetRepository = Object.create(Repository.prototype);
widgetRepository.model = Widget;

widgetRepository.findOneAndPopulate = function (id, callback) {
  this.model.findOne({ _id: id }).populate('admin').exec(callback);
};

widgetRepository.updateOrCreateByAdminId = function (id, data, callback) {
  console.log(id);
  console.log(data);
  const model = this.model;
  model.update({ admin: id }, data, { upsert: true }).exec(callback);
};

widgetRepository.findByAdminId = function (id, callback) {
  this.model.findOne({ admin: id }).populate('admin').exec((data) => {
    if (data) {
      callback(null, data);
    } else {
      const widgetDefaultSettings = {
        mainChatColor: '#D91111',
        backgroundImage: 'http://localhost:3000/frontend/src/common/resources/wallpapers/w1',
        widgetPosition: 'right',
      };
      callback(null, widgetDefaultSettings);
    }
  });
};


module.exports = widgetRepository;
