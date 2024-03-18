const admin = require('firebase-admin');
const serviceAccount = require('../../api_key/timtronhanh-ebce7-firebase-adminsdk-7ohdv-f96909d427.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
