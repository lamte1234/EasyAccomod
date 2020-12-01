const mongoose = require('mongoose');

const renterSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    wishlist: [{post_wish_id : Object}],
    report: [{
        post_id: Object,
        comment: String
    }]
});

const Renter = mongoose.model('Renter', renterSchema, 'renter_account');

module.exports = Renter;