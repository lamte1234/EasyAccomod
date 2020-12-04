const Post = require('../../models/post.model');
const Owner = require('../../models/owner.model');

// /users/owner/:id/post
module.exports.postOwnerPost = (req, res) => {
    const data = {
        ...req.body,
        is_approved: false,
        owner_id: req.params.id,
        review: []
    }

    const newPost = new Post(data);
    newPost.save()
    .then(post => console.log(post))
    .catch(err => console.log('server error'));
}

// module.export.editOwnerPost = (req, res) => {

// }