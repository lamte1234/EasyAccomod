const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    renter_id: mongoose.Schema.Types.ObjectId,
    post_id: mongoose.Schema.Types.ObjectId,
    review: String,
    star: Number,
    is_approved: Boolean
});

const Review = mongoose.model('Review', reviewSchema, 'review');

module.exports = Review;