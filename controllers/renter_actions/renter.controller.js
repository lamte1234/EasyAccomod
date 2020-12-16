const Post = require('../../models/post.model');
const Renter = require('../../models/owner.model');
const Wishlist = require('../../models/wishlist.model');
const Owner = require('../../models/owner.model');

// /users/renter/search
module.exports.getSearch = (req, res) => {
    const data = {
        ...req.query,
        is_approved: true,
        status: true
    }
    Post.find(data)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).send('server error'));
}

// /users/renter/post/:id
module.exports.getPostByID = (req, res) => {
    const id = req.params.id;   

    Post.findByIdAndUpdate(id, {$inc: {views: 1}}).populate('owner_id')
    .then(post => res.status(200).json(post))  // post before increasing view
    .catch(err => res.status(500).send('server error'));
}

// users/renter/wishlist
module.exports.wishlist = (req, res) => {
    const id = req.signedCookies.userId;

    Wishlist.find({renter_id: id})
    .then(wishlist => res.status(200).json(wishlist.post_list))
    .catch(err => res.status(500).send('server error'));
}

// users/renter/wishlist/:id
module.exports.addWishlist = (req, res) => {
    const id = req.params.id;
    const renter_id = req.signedCookies.userId;

    Post.findByIdAndUpdate(id, {$inc: {likes: 1}})
    .then(post => console.log('increase post likes'))
    .catch(err => res.send('server error'));

    Wishlist.findOneAndUpdate({renter_id: renter_id}, {$push: {post_list: id}})
    .then(wishlist => res.status(200).send('success'))
    .catch(err => res.status(500).send('server error'));

}

// /users/renter/explore
module.exports.getExplore = (req, res) => {
    Post.find({is_approved: true}).populate('owner_id')
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).send('server error'));
}