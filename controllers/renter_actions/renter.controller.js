const Post = require('../../models/post.model');
const Renter = require('../../models/owner.model');
// sửa lại theo form nhập liệu sau
// /users/renter/:id/search
module.exports.postSearch = (req, res) => {
    const data = {
        ...req.body
    }

    Post.find(data)
    .then(posts => res.json(posts))
    .catch(error => res.status(400).json('error' + error));
}

// users/renter/:id/wishlist
module.exports.wishlist = (req, res) => {
    const id = req.params.id

    Renter.findById(id)
    .then(renter => res.json(renter.wishlist))
    .catch(err).catch(error => res.status(400).json('error' + error));
}