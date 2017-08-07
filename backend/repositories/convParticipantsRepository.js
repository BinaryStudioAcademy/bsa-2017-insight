var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var ConvParticipants = require('../schemas/convParticipantsSchema');

function ConvParticipantsRepository() {
	Repository.prototype.constructor.call(this);
	this.model = ConvParticipants;
}

ConvParticipantsRepository.prototype = new Repository();

module.exports = new ConvParticipantsRepository();
