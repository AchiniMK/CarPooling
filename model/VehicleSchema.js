const mongoose = require('mongoose');
const VehicleSchema = new mongoose.Schema ({
    vehicleNo: { type: String, required: true },
    vehicleType: { type: String, required: true },
	no_of_seats: { type: String, required: true }
});

module.exports = mongoose.model('Vehicles', VehicleSchema);