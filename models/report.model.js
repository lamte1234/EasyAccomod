const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    renter_id: mongoose.SchemaTypes.ObjectId,
    post_id: mongoose.SchemaTypes.ObjectId,
    comment: String
});

const Report = mongoose.model('Report', reportSchema, 'report');

module.exports = Report;