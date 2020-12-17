module.exports.reviewValidation = (req, res, next) => {
    const review_re = /^[a-zA-Z0-9.\s!#$%&'*+/=?^_`{|}~-]+$/;
    const star_re = /^[0-5]{1}$/;
    
    let errors = [];

    if(!req.body.review) {
        errors.push('You must add a review')
    }

    if(req.body.review && !req.body.review.match(review_re)) {
        errors.push('Invalid review')
    }

    if(!req.body.star) {
        errors.push('Warning: You are using an invalid software')
    }

    if(req.body.star && !req.body.star.match(star_re)) {
        errors.push('Invalid star number')
    }

    if (errors.length) {
        const data = {
            errors: errors
        }
        res.json(data);
        return;
    }
    
    next();
}