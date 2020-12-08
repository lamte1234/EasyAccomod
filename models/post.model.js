const mongoose = require('mongoose');
const { post } = require('../routes/users.route');

const postSchema = mongoose.Schema({
    owner_id: mongoose.Schema.Types.ObjectId,
    title: String,
    address: {
        city: String,
        district: String,
        ward: String,
        street: String
    },
    room_type: String,
    rented_rate: String, //vnd per month
    area: String,
    description: {
        bathroom: Boolean,
        kitchen: Boolean,
        air_con: Boolean,
        water_heater: Boolean,
        service_rate: {
            electricity: Number, //vnd per kwh
            water: Number //vnd per m3
        }
    },
    image: [String],
    status: Boolean,
    is_approved: Boolean,
    time: String,
    review: [{
        renter_id: mongoose.Schema.Types.ObjectId,
        review: String,
        star: Number
    }]
});

const Post = mongoose.model('Post', postSchema, post);

module.exports = Post;