const settingsRepository = require('../../repositories/settingsRepository');

module.exports = (app) => {
	app.post('/api/admin/settings', (req, res, next) => {
		settingsRepository.setSettings(req.body.element, req.body.settings, (err) => {
			if(err) return next(err);
			res.json({ text: 'Settings have been updated' });
		});
	});

	app.get('/api/admin/settings/:element', (req, res, next) => {
		const widgetDefaultSettings = {
			mainChatColor: '#D91111',
			backgroundImage: 'w1',
			forceMessage: 'Hi! How can I help you?',
			timeout: 10,
			widgetPosition: 'right'
		}
		settingsRepository.getSettings(req.params.element, (err, data) => {
			if(err) return next(err);
			if(!data && req.params.element === 'widget') return res.json({ settings: widgetDefaultSettings });
			res.json(data);
		})
	});
	
}