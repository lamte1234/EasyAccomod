const Owner = require('../../models/owner.model');
const Post = require('../../models/post.model');

// users/admin/accounts
module.exports.getUnapprovedOwners = (req, res) => {
    Owner.find({is_approved: false})
    .then(owners => res.json(owners))
    .catch(err => res.json('server error'));
}


// /users/admin/accounts/:id
module.exports.patchApprovedOwner = (req, res) => {
    const id = req.params.id;

    Owner.findByIdAndUpdate(id, {is_approved: true})
    .then(owner => res.status(200).json('success'))
    .catch(err => res.json('server error'));
}

// /users/admin/posts
module.exports.getUnapprovedPosts = (req, res) => {
    Post.find({is_approved: false})
    .then(posts => res.json(posts))
    .catch(err => res.json('seerver error'));
}

// / users/admin/posts/:id
module.exports.patchApprovedPost = (req, res) => {
    const id = req.params.id;

    Post.findByIdAndUpdate(id, {is_approved: true})
    .then(post => res.status(200).json('success'))
    .catch(err => res.json('server error'));
}

