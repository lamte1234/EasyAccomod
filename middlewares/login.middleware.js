const db = require('../db');

module.exports.postLogin = (req, res, next) => {
   
    let user = db.get(req.body.account_type).find({email: req.body.email}).value();
    let errors = [];

    if(!req.body.email){
        errors.push('Email is required.');
    }

    if(!req.body.password){
        errors.push('Password is required.');
    }

    if((!user && req.body.email && req.body.password) ||
        (user && req.body.password !== user.password && req.body.password)){
        errors.push('Wrong password or email');
    }

    if(errors.length){
        res.render('login', {
            errors: errors,
            values: req.body
        });
        return;
    }


    next();
}