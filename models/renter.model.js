const mongoose = require('mongoose');

const renterSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String
});

const Renter = mongoose.model('Renter', renterSchema, 'renter_account');

module.exports = Renter;