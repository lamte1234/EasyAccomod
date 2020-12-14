const Post = require('../../models/post.model');
const Renter = require('../../models/owner.model');
const Wishlist = require('../../models/wishlist.model');
// sửa lại theo form nhập liệu sau
// /users/renter/search
module.exports.getSearch = (req, res) => {
    const data = {
        ...req.query
    }

    Post.find(data)
    .then(posts => res.json(posts))
    .catch(error => res.status(400).json('error' + error));
}

// /users/renter/post/:id
module.exports.getPostByID = (req, res) => {
    const id = req.params.id;   

    Post.findByIdAndUpdate(id, {$inc: {views: 1}})
    .then(post => res.json(post))  // post before increasing view
    .catch(err => res.json('server error'));
}

// users/renter/wishlist
module.exports.wishlist = (req, res) => {
    const id = req.signedCookies.userId;

    Wishlist.find({renter_id: id})
    .then(wishlist => res.json(wishlist.post_list))
    .catch(err => console.log(err));
}

// users/renter/wishlist/:id
module.exports.addWishlist = (req, res) => {
    const id = req.params.id;
    const renter_id = req.signedCookies.userId;

    Post.findByIdAndUpdate(id, {$inc: {likes: 1}})
    .then(post => console.log('increase post likes'))
    .catch(err => res.json('server error'));

    Wishlist.findOneAndUpdate({renter_id: renter_id}, {$push: {post_list: id}})
    .then(wishlist => {res.status(200).json('success')})
    .catch(err => res.json('server error'));

}