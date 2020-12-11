const mongoose = require('mongoose');

const wishListSchema = mongoose.Schema({
    renter_id: mongoose.SchemaTypes.ObjectId,
    post_list: [mongoose.SchemaTypes.ObjectId]
});

const Wishlist = mongoose.model('Wishlist', wishListSchema, 'wishlist');

module.exports = Wishlist;