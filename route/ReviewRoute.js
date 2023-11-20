const express = require('express');
const ReviewController = require('../controller/reviewController');
const verifyToken = require('../middleware/AuthMiddleware')

const router = express.Router();

router.post('/save-review', verifyToken, ReviewController.saveReview);
router.put('/update-review',  verifyToken, ReviewController.updateReview);
router.delete('/delete-review', verifyToken,  ReviewController.deleteReview);
router.get('/get-review',  verifyToken, ReviewController.findReview);
router.get('/get-all-reviews',  verifyToken, ReviewController.findAllReviews);

module.exports=router;