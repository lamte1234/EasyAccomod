const Post = require('../../models/post.model');
const Wishlist = require('../../models/wishlist.model');
const Review = require('../../models/review.model');
const Report = require('../../models/report.model');
const moment = require('moment');

// /users/renter/search
module.exports.getSearch = (req, res) => {
    const data = {
        ...req.query,
        is_approved: true,
        status: true
    }
    Post.find(data)
    .then(posts => {
        let data = [];
        posts.forEach(post => {
            const week = parseInt(post.time);
            const last_approve_time = post.approve_date;
            const diff = moment.duration(moment() - last_approve_time).asWeeks();
            if(diff <= week) {data.push(post)}
        })
        res.status(200).json(data);
    })
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

    Wishlist.findOne({renter_id: id}).populate('post_list')
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
    .then(posts => {
        let data = [];
        posts.forEach(post => {
            const week = parseInt(post.time);
            const last_approve_time = post.approve_date;
            const diff = moment.duration(moment() - last_approve_time).asWeeks();
            if(diff <= week) {data.push(post)}
        })
        res.status(200).json(data)
    })
    .catch(err => res.status(500).send('server error'));
}

// /users/renter/review/:id
module.exports.postReviewByPostID = (req, res) => {
    const dataReview = {
        renter_id:  req.signedCookies.userId,
        post_id: req.params.id,
        star: parseInt(req.body.star),
        review: req.body.review
    }

    const newReview = new Review(dataReview);
    newReview.save()
    .then(review => res.status(201).send('success'))
    .catch(err => res.status(500).send('server error'));
}

module.exports.getAllReviewsByPostID = (req, res) => {
    const post_id = req.params.id;

    Review.find({post_id: post_id}).populate('renter_id', 'name')
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).send('server error'));
}

// /users/renter/report/:id
module.exports.postReportByPostID = (req, res) => {
    const renter_id = req.signedCookies.userId;
    const post_id = req.params.id;
    const comment = req.body.comment;
    
    const dataReport = {
        renter_id: renter_id,
        post_id: post_id,
        comment: comment
    }

    const newReport = new Report(dataReport);
    newReport.save()
    .then(report => res.status(201).send('success'))
    .catch(err => res.status(500).send('server error'));
}