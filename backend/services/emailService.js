const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'bsa.insight@gmail.com',
    pass: 'bsainsight',
  },
});

function send(options, callback) {
  if (!options.to || !options.subject || !options.text) {
    return callback(new Error('Missing some required options'));
  }
  const emailOptions = Object.assign({ from: 'bsa.insight@gmail.com' }, options);

  smtpTransport.sendMail(emailOptions, callback);
}

// function isValidEmail(email) {
//   to be implemented...
// };

module.exports = { send };
