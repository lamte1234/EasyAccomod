const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    owner_id: mongoose.Schema.Types.ObjectId, // not in form
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
    is_approved: Boolean, // not in form
    time: String,
    likes: Number, // not in form
    views: Number, // not in form
});

const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;