const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    id_card_number: String,
    address: String,
    phone: Number,
    is_approved: Boolean
});

const Owner = mongoose.model('Owner', ownerSchema, 'owner_account');

module.exports = Owner;