var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var Session = require('../schemas/sessionSchema');

function SessionRepository() {
    Repository.prototype.constructor.call(this);
    this.model = Session;
}

SessionRepository.prototype = new Repository();

SessionRepository.prototype.oneMoreFunction = function(SessionId, obj, callback) {
    var model = this.model;
    var query = model.findByIdAndUpdate(SessionId, {
        $push: {
            property:{
                nestedProperty: value,
            }
        }
    }, {});
    query.exec(callback);
};

module.exports = new SessionRepository();
