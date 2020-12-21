const Owner = require('../../models/owner.model');
const Post = require('../../models/post.model');
const Report = require('../../models/report.model');
const moment = require('moment');

// users/admin/accounts
module.exports.getUnapprovedOwners = (req, res) => {
    Owner.find({is_approved: false})
    .then(owners => res.status(200).json(owners))
    .catch(err => res.status(500).send('server error'));
}


// /users/admin/accounts/:id
module.exports.patchApprovedOwner = (req, res) => {
    const id = req.params.id;

    Owner.findByIdAndUpdate(id, {is_approved: true})
    .then(owner => res.status(200).json('success'))
    .catch(err => res.status(500).send('server error'));
}

// /users/admin/edit-auth
module.exports.getUneditableOwners = (req, res) => {
    Owner.find({is_approved: true, editable: false})
    .then(owners => res.status(200).json(owners))
    .catch(err => res.status(500).send('server error'));
}

// /users/admin/edit-auth/:id
module.exports.patchEditAuthOwner = (req, res) => {
    const id = req.params.id;

    Owner.findByIdAndUpdate(id, {editable: true})
    .then(owner => res.status(200).json('success'))
    .catch(err => res.status(500).send('server error'));
}

// /users/admin/posts
module.exports.getUnapprovedPosts = (req, res) => {
    Post.find({is_approved: false})
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).send('server error'));
}

// / users/admin/posts/:id can get approved post too
module.exports.getUnapprovedPostByID = (req, res) => {
    const id = req.params.id;

    Post.findById(id).populate('owner_id')
    .then(post => res.status(200).json(post))
    .catch(err => console.log(err));
}

module.exports.patchApprovedPost = (req, res) => {
    const id = req.params.id;

    Post.findByIdAndUpdate(id, {is_approved: true,
                                approve_date: moment().toISOString()})
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).send('server error'));
}

// /users/admin/report
module.exports.getAllReports = (req, res) => {
    Report.find().populate('renter_id', 'name').populate('post_id', 'title')
    .then(reports => res.status(200).json(reports))
    .catch(err =>  res.status(500).send('server error'))
}

