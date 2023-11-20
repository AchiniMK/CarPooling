const express = require('express');
const RideRequestController = require('../controller/rideReqController');
const verifyToken = require('../middleware/AuthMiddleware')

const router = express.Router();

router.post('/save-ride-request', verifyToken, RideRequestController.saveRideRequest);
router.put('/update-ride-request',  verifyToken, RideRequestController.updateRideRequest);
router.delete('/delete-ride-request', verifyToken,  RideRequestController.deleteRideRequest);
router.get('/get-ride-request',  verifyToken, RideRequestController.findRideRequest);
router.get('/get-all-ride-requests',  verifyToken, RideRequestController.findAllRideRequests);

module.exports=router;