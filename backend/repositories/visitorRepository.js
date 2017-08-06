const Repository = require('./generalRepository');
const User = require('../schemas/visitorSchema');

const visitorRepository = Object.create(Repository.prototype);
visitorRepository.model = User;

visitorRepository.oneMoreFunction = function (userId, obj, callback) {
  const model = this.model;
  const query = model.findByIdAndUpdate(userId, {
    $push: {
      property: {
        nestedProperty: value,
      }
    }
  }, {});
  query.exec(callback);
};

visitorRepository.findOneAndPopulate = function (id, callback) {
  this.model.findById({ _id: id }).populate('conversations activeConversation widget').exec(callback);
};

// function UserRepository() {
//   Repository.prototype.constructor.call(this);
//   this.model = User;
// }
//
// UserRepository.prototype = new Repository();
//
// UserRepository.prototype.oneMoreFunction = function (userId, obj, callback) {
//   var model = this.model;
//   var query = model.findByIdAndUpdate(userId, {
//     $push: {
//       property: {
//         nestedProperty: value,
//       }
//     }
//   }, {});
//   query.exec(callback);
// };

module.exports = visitorRepository;
