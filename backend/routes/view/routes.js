module.exports = function(app) {
	return {
		commonRoutes: require('./commonRoutes')(app)
	};
};