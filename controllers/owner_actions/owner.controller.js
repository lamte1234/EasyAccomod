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

    Post.create(data, (err, data) => {
        if(err){
            console.log('Server error,');
        }
    });
}

module.export.editOwnerPost = (req, res) => {

}