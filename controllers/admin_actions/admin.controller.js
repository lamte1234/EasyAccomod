const Owner = require('../../models/owner.model');
const Post = require('../../models/post.model');
const Report = require('../../models/report.model');
const OwnerNofi = require('../../models/owner_nofi.model');
const moment = require('moment');
const AdminNofi = require('../../models/admin_nofi.model');

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

module.exports.patchApprovedPost = async (req, res) => {
    const id = req.params.id;

    try{
        const post = await Post.findByIdAndUpdate(id, {is_approved: true,
                                approve_date: moment().toISOString()})
        const newNotification = {
            post_id: id,
            owner_id: post.owner_id,
            read: false,
            issue_time: moment().toISOString()
        }

        const ownerNofi = await new OwnerNofi(newNotification).save();
        res.status(200).send('success');
    }
    catch(err) {
        res.status(500).send('server error');
    }
    
}

// /users/admin/report
module.exports.getAllReports = (req, res) => {
    Report.find().populate('renter_id', 'name').populate('post_id', 'title')
    .then(reports => res.status(200).json(reports))
    .catch(err =>  res.status(500).send('server error'))
}

// /users/admin/notifications
module.exports.getAdminNotifications = (req, res) => {
    AdminNofi.find({read: false}).populate('owner_id', 'name').populate('post_id', 'title')
    .then(notificaions => res.status(200).json(notificaions))
    .catch(err => res.status(500).send('server error'))
}
// /users/admin/notifications/:id
module.exports.patchAdminNotifications = (req, res) => {
    const id = req.params.id;

    AdminNofi.findByIdAndUpdate(id, {read: true})
    .then(nofi => res.status(200).send('success'))
    .catch(err => res.status(500).send('server error'))
}
