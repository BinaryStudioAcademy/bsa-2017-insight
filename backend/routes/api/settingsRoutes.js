const settingsRepository = require('../../repositories/settingsRepository');

module.exports = (app) => {
	app.post('/api/admin/settings', (req, res, next) => {
		settingsRepository.setSettings(req.body.element, req.body.settings, (err) => {
			if(err) return next(err);
			res.json({ text: 'Settings have been updated' });
		});
	});

	app.get('/api/admin/settings/:element', (req, res, next) => {
		settingsRepository.getSettings(req.params.element, (err, data) => {
			if(err) return next(err);
			res.json(data);
		})
	});
	
}