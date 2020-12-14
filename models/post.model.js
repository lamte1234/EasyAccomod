const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    owner_id: mongoose.Schema.Types.ObjectId, // not in form
    title: String,
    // address
    city: String,
    district: String,
    ward: String,
    street: String,

    room_type: String,
    rented_rate: String, //vnd per month
    area: String, // m2
    // description
    bathroom: Boolean,
    kitchen: Boolean,
    air_con: Boolean,
    water_heater: Boolean,
    //service rate
    electricity: String, //vnd per kwh
    water: String, //vnd per m3

    image: [String],
    status: Boolean,
    is_approved: Boolean, // not in form
    time: String, // week 1-4
    owner: String,
    email: String,
    phone: Number,
    likes: Number, // not in form
    views: Number, // not in form
});

const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;