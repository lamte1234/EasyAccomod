module.exports.reviewValidation = (req, res, next) => {
    const review_re = /^[a-zA-Z0-9.\s!#$%&'*+/=?^_`{|}~-]+$/;
    
    let errors = [];

    if(!req.body.review) {
        errors.push('You must add a review')
    }

    if(req.body.review && !req.body.review.match(review_re)) {
        errors.push('Invalid review')
    }

    if(req.body.star === undefined) {
        errors.push('Warning: You are using an invalid software')
    }

    if((req.body.star && req.body.star < 1) ||
       (req.body.star && req.body.star > 5)) {
        errors.push('Invalid star number')
    }

    if (errors.length) {
        const data = {
            errors: errors
        }
        res.status(200).json(data);
        return;
    }
    
    next();
}