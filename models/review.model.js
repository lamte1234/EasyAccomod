const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    renter_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'Renter'},
    post_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'Post'},
    review: String,
    star: Number,
    is_approved: Boolean
});

const Review = mongoose.model('Review', reviewSchema, 'review');

module.exports = Review;