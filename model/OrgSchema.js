const mongoose = require('mongoose');
const OrgSchema = new mongoose.Schema ({
    orgName: { type: String, required: true },
    orgType: { type: String, required: true },
	orgEmail: { type: String, required: true },
	orgLocation: { type: String, required: true }
});

module.exports = mongoose.model('Organizations', OrgSchema);