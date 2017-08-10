const path = require('path');
const apiResponse = require('express-api-response');
const injectData = require('../../middleware/injectedDataMiddleware');

module.exports = function(app) {
	app.get('*', function(req, res, next) {
		injectData(req, res, {}, false);
	});
};
