const mongoose = require('mongoose');

// only about admin approve owner post
const ownerNofiSchema = new mongoose.Schema({
    owner_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'Owner'},
    post_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'Post'},
    read: Boolean,
    issue_time: Date
})

const OwnerNofi = mongoose.model('OwnerNofi', ownerNofiSchema, 'owner_nofi')

module.exports = OwnerNofi;