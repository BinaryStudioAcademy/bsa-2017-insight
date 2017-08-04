const path = require('path');
const apiResponse = require('express-api-response');

module.exports = function(app) {
	app.get('*', function(req, res, next) {
		res.header = ('Content-Type', 'text/html');
		res.sendFile(path.resolve(__dirname + '/../../../index.html'));
	});
};