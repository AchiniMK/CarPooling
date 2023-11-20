const express = require('express');
const RideController = require('../controller/rideController');
const verifyToken = require('../middleware/AuthMiddleware')

const router = express.Router();

router.post('/save-ride', verifyToken, RideController.saveRide);
router.put('/update-ride',  verifyToken, RideController.updateRide);
router.delete('/delete-ride', verifyToken,  RideController.deleteRide);
router.get('/get-ride',  verifyToken, RideController.findRide);
router.get('/get-all-rides',  verifyToken, RideController.findAllRides);

module.exports=router;