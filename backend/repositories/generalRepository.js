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

Repository.prototype.findByConditions = function (conditions, callback, projection) {
  const model = this.model;
  const query = model.find(conditions, projection);
  query.exec(callback);
};

Repository.prototype.getByUsername = function(username, callback) {
  const model = this.model;
  const query = model.findOne({ username });
  query.exec(callback);
};

Repository.prototype.getByEmail = function(email, callback) {
  const model = this.model;
  const query = model.findOne({ email });
  query.exec(callback);
};

Repository.prototype.getByToken = function(token, callback) {
  const model = this.model;
  const query = model.findOne(token);
  query.exec(callback);
};

Repository.prototype.getByFullName = function(name, callback) {
  const model = this.model;
  const {first, last} = name;

  let query;

  if(first && last) {
    query = model.find({ firstName: first, lastName: last });
  } else {
    if(first) {
      query = model.find({ firstName: first });
    } else {
      query = model.find({ lastName: last });
    }
  }

  query.exec(callback);
}

module.exports = Repository;
