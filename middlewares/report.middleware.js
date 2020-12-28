module.exports.reportValidation = (req, res, next) => {
    const comment_re = /^[a-zA-Z0-9.\s!#$%&'*+/=?^_`{|}~-]+$/;

    let errors = [];

    if(!req.body.comment) {errors.push('You must add report details')}

    if(req.body.comment && !req.body.comment.match(comment_re)) {
        errors.push('Invalid comment');
    }

    if(errors.length) {
        const data = {
            errors: errors
        }
        res.status(200).json(data);
        return;
    }

    next()
    
}