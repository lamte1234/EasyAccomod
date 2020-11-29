const db = require('../db');

// renter validate
module.exports.postRenter = (req, res, next) => {
    let renter = db.get('renter_account').find({email: req.body.email}).value();
    let errors = [];
    
    if(renter) {
        errors.push('Existing email');
    }

    if(!req.body.email) {
        errors.push('Email is required');
    }

    if(!req.body.name) {
        errors.push('Name is required');
    }

    if(!req.body.password) {
        errors.push('Password is required');
    }

    if(req.body.password !== req.body.cf_pass) {
        errors.push('Password must match');
    }

    if(errors.length) {
        res.render('signup/renter', {
            errors: errors,
            values: req.body
        });
        return;
    }
    
    next();
};


//owner validate
module.exports.postOwner = (req, res, next) => {
    let owner = db.get('owner_account').find({email: req.body.email}).value();
    let errors = [];

    if(owner) {
        errors.push('Existing email.');
    }

    if(!req.body.email) {
        errors.push('Email is required');
    }

    if(!req.body.name) {
        errors.push('Name is required');
    }

    if(!req.body.id_card_number) {
        errors.push('Identificaton number is required');
    }

    if(!req.body.phone) {
        errors.push('Phone is required');
    }
    
    if(!req.body.address) {
        errors.push('Address is required');
    }

    if(!req.body.password) {
        errors.push('Password is required');
    }

    if(req.body.password !== req.body.cf_pass) {
        errors.push('Password must match');
    }

    if(errors.length) {
        res.render('signup/owner', {
            errors: errors,
            values: req.body
        });
        return;
    }
    
    next();
};