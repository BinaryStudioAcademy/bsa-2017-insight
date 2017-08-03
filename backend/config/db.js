module.exports = {
	dbname: 'intercom',
	uri: 'mongodb://localhost/intercom',
	mocked_db: false,
	opts: {
		server: {
			auto_reconnect: true,
			poolSize: 40
		},
		user: 'root'
	}
};