const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
});

const Admin = mongoose.model('Admin', adminSchema, 'admin_account');

module.exports = Admin;