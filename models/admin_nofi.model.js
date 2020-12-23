const mongoose = require('mongoose');

// only about owner update post status
const adminNofiSchema = new mongoose.Schema({
    owner_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'Owner'},
    post_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'Post'},
    read: Boolean, 
    issue_time: Date
});

const AdminNofi = mongoose.model('AdminNofi', adminNofiSchema, 'admin_nofi');

module.exports = AdminNofi;