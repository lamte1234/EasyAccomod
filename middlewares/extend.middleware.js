const Post = require('../models/post.model');
const moment = require('moment');

module.exports.timeExtendValidation = async (req, res ,next) => {
    const post_id = req.params.id;
    let errors = [];
    let post;

    try {
        post = await Post.findOne(post_id);
    }
    catch(err) {
        res.status(500).send('server error');
        return;
    }
    const approve_date = post.approve_date;
    const week = parseInt(post.time);
    const diff = moment.duration(moment() - approve_date).asWeeks();

    if(!post || (post && diff <= week)) {
        errors.push('Request is not allowed')
    }

    if(!req.body.time) { errors.push('Time is required') }

    if(req.body.time && !req.body.time.match(/^[1-4]$/)) {
        errors.push('Posting time must in range 1-4 weeks.')
    }
    
    if(errors.length) {
        const data = {
            errors: errors
        }
        res.status(200).json(data);
        return;
    }
    
    next();
}