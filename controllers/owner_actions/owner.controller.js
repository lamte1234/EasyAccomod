const Post = require('../../models/post.model');
const Owner = require('../../models/owner.model');
const { owner } = require('../users.controller');


// /users/owner/post
module.exports.postOwnerPost = (req, res) => {
    let images = [];
    req.files.map(file => {
        const file_dir = file.path.split('\\').slice(1).join('\\');
        images.push(file_dir);
    })

    const owner_id  = req.signedCookies.userId;

    const data = {
        ...req.body,
        is_approved: false,
        owner_id: owner_id,
        status: true,
        likes: 0,
        views: 0,
        image: images
    };

    const newPost = new Post(data);
    newPost.save()
    .then(post => res.status(201).send('success'))
    .catch(err => res.status(500).send('server error'));
}

// /users/owner/edit show list of owners post
module.exports.getOwnerPost = (req, res) => {
    Post.find({owner_id: req.signedCookies.userId,
                is_approved: false})
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).send('server error'));
}


// /users/owner/edit/:id
module.exports.getOwnerPostByID = (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).send('server error'));
}

module.exports.putEditOwnerPostByID = (req, res) => {
    const id = req.params.id;
    const data = {
        ...req.body, // req.body must have status field
        is_approved: false,
        owner_id: req.signedCookies.userId,
    };

    Post.findByIdAndUpdate(id, data)
    .then(post => res.status(200).send('success'))
    .catch(err => res.status(500).send('server error'))
}

// /users/owner/account
module.exports.getOwnerAccount = (req, res) => {
    const owner_id = req.signedCookies.userId;

    Owner.findById(owner_id)
    .then(owner => res.status(200).json(owner))
    .catch(err => res.status(500).send('server error'));
}

module.exports.putOwnerAccountChange = (req, res) => {
    const owner_id = req.signedCookies.userId;
    const data = {
        ...req.body,
        is_approved: false
    };

    Owner.findByIdAndUpdate(owner_id, data)
    .then(owner => res.status(200).send('success'))
    .catch(err => res.status(500).send('server error'));
}

// /users/owner/all-post 
module.exports.getAllPost = (req, res) => {
    const owner_id = req.signedCookies.userId;
    
    Post.find({owner_id: owner_id})
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).send('server error'));
}

// /users/owner/change-status/:id
module.exports.patchPostStatus = (req, res) => {
    const post_id = req.params.id;

    Post.findById(post_id)
    .then(post => {
        post.status = !post.status;
        post.save(err => {
            if(err) {res.status(500).send('server error')}
        })
        res.status(200).send('success');
    })
    .catch(err => res.status(500).send('server error'));
}