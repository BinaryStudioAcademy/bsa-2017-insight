const adminRepository = require('../repositories/adminRepository');


function checkVerification(data, callback) {
  let ifVerifiedAdminExist = null;
  adminRepository.getAll((err, result) => {
    ifVerifiedAdminExist = result.some(e => e.verified === true);
    if (!ifVerifiedAdminExist) {
      const generalAdmin = {
        firstName: 'generalinsight',
        lastName: 'generalinsight',
        password: 'generalinsight',
        email: 'generalinsight@insight.com',
        avatar: 'avatar.png',
        username: 'generalinsight',
        isAdmin: true,
        verified: true,
        isSuperUser: true,
      };
      console.log('ifVerifiedAdminExist FALSE');
      callback(generalAdmin);
    } else {
      console.log('ifVerifiedAdminExist TRUE');
      callback(null);
    }
  });
}

module.exports = checkVerification;
