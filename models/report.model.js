const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    renter_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'Renter'},
    post_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'Post'},
    comment: String
});

const Report = mongoose.model('Report', reportSchema, 'report');

module.exports = Report;