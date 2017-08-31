const Widget = require('../schemas/widgetSchema');
const Repository = require('./generalRepository');

const widgetRepository = Object.create(Repository.prototype);
widgetRepository.model = Widget;

widgetRepository.findOneAndPopulate = function (id, callback) {
  this.model.findOne({ _id: id }).populate('admin').exec(callback);
};

widgetRepository.updateOrCreateByWebsiteName = function (name, data, callback) {
  const model = this.model;
  model.update({ website: name }, data, { upsert: true }).exec(callback);
};

widgetRepository.findByWebsiteName = function (name, callback) {
  this.model.findOne({ website: name }).populate('admin').exec().then((data) => {
    if (data) {
      callback(null, data);
    } else {
      const obj = {
        options: {
          primaryColor: '#D91111',
          backgroundImage: 'resources/wallpapers/w1',
          widgetPosition: 'right',
        },
      };
      callback(null, obj);
    }
  });
};


module.exports = widgetRepository;
