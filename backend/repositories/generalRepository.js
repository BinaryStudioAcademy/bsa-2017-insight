const Repository = function () {
};

Repository.prototype.add = function (data, callback) {
  const Model = this.model;
  const newItem = new Model(data);
  newItem.save(callback);
};

Repository.prototype.update = function (id, body, callback) {
  const query = this.model.update({ _id: id }, body);
  query.exec(callback);
};

Repository.prototype.delete = function (id, callback) {
  const model = this.model;
  const query = model.remove({ _id: id });
  query.exec(callback);
};

Repository.prototype.getAll = function (callback) {
  const model = this.model;
  const query = model.find();
  query.exec(callback);
};

Repository.prototype.getById = function (id, callback) {
  const model = this.model;
  const query = model.findOne({ _id: id });
  query.exec(callback);
};

Repository.prototype.findByConditions = function (conditions, callback) {
  const model = this.model;
  const query = model.find(conditions);
  query.exec(callback);
};

module.exports = Repository;
