const mongoose = require('mongoose');
const RideSchema = new mongoose.Schema ({
    from: { type: String, required: true },
    to: { type: String, required: true },
	date: { type: String, required: true },
	time: { type: String, required: true },
	passenger: { type: String },
    no_of_seats_available: { type: String, required: true },
    vehicle: { type: String, required: true },
	vehicleNo: { type: String, required: true },
	organization: { type: String},
	amount: { type: String, required: true },
    other: { type: String}
});

module.exports = mongoose.model('Rides', RideSchema);