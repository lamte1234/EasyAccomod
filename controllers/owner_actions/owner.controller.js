const Post = require('../../models/post.model');
const Owner = require('../../models/owner.model');


// /users/owner/post
module.exports.postOwnerPost = (req, res) => {
    const images = [];
    req.files.map(file => {
        const file_dir = file.path.split('\\').slice(1).join('\\');
        images.push(file_dir);
    })

    const data = {
        ...req.body,
        is_approved: false,
        owner_id: 'test',
        status: true,
        likes: 0,
        views: 0,
        image: images
    }
    

    const newPost = new Post(data);
    newPost.save()
    .then(post => res.status(200).json('success'))
    .catch(err => res.json('server error'));
}

// /users/owner/edit show list of owners post
module.exports.getOwnerPost = (req, res) => {
    Post.find({owner_id: req.session.user,
                is_approved: false})
    .then(posts => res.json(posts))
    .catch(err => res.json('server error'));
}


// /users/owner/edit/:id
module.exports.getOwnerPostByID = (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.json('server error'));
}

module.exports.postEditOwnerPostByID = (req, res) => {
    const id = req.params.id;
    const data = {
        ...req.body, // req.body must have status field
        is_approved: false,
        owner_id: req.session.user,
    };

    Post.findByIdAndUpdate(id, data)
    .then(post => res.status(200).json('success'))
    .catch(err => res.json('server error'))
}