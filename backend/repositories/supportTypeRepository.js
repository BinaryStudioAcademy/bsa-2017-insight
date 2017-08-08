var mongoose = require('mongoose');
var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var SupportType = require('../schemas/supportTypeSchema');

function SupportTypeRepository() {
	Repository.prototype.constructor.call(this);
	this.model = SupportType;
}

SupportTypeRepository.prototype = new Repository();

module.exports = new SupportTypeRepository();
