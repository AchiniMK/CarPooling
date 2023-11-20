const express = require('express');
const VehicleController = require('../controller/vehicleController');
const verifyToken = require('../middleware/AuthMiddleware')

const router = express.Router();

router.post('/save-vehicle', verifyToken, VehicleController.saveVehicle);
router.put('/update-vehicle', verifyToken, VehicleController.updateVehicle);
router.delete('/delete-vehicle', verifyToken, VehicleController.deleteVehicle);
router.get('/get-vehicle',  verifyToken, VehicleController.findVehicle);
router.get('/get-all-vehicles',  verifyToken, VehicleController.findAllVehicles);

module.exports=router;