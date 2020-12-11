const Post = require('../../models/post.model');
const Renter = require('../../models/owner.model');
const Wishlist = require('../../models/wishlist.model');
// sửa lại theo form nhập liệu sau
// /users/renter/search
module.exports.postSearch = (req, res) => {
    const data = {
        ...req.body
    }

    Post.find(data)
    .then(posts => res.json(posts))
    .catch(error => res.status(400).json('error' + error));
}

// users/renter/wishlist
module.exports.wishlist = (req, res) => {
    const id = req.session.user;

    Wishlist.find({renter_id: id})
    .then(wishlist => res.json(wishlist.post_list))
    .catch(err).catch(error => res.status(400).json('error' + error));
}