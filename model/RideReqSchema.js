const mongoose = require('mongoose');
const RideRequestSchema = new mongoose.Schema ({
    from: { type: String, required: true },
    to: { type: String, required: true },
	date: { type: String, required: true },
	time: { type: String, required: true },
	driver: { type: String },
    vehcileType: { type: String },
	organization: { type: String },
	amount: { type: String},
    other: { type: String}
});

module.exports = mongoose.model('RideRequests', RideRequestSchema);