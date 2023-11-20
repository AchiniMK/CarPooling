const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema ({
    comment: { type: String, required: true },
    rate: { type: Number, required: true }
});

module.exports = mongoose.model('Reviews', ReviewSchema);