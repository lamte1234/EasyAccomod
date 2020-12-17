const mongoose = require('mongoose');


const wishListSchema = mongoose.Schema({
    renter_id: mongoose.SchemaTypes.ObjectId,
    post_list: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Post'}]
});

const Wishlist = mongoose.model('Wishlist', wishListSchema, 'wishlist');

module.exports = Wishlist;