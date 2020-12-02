const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');


// renter validate
module.exports.postRenter = async (req, res, next) => {
    let errors = [];

    if (!req.body.email) {
        errors.push('Email is required.');
    }

    if (!req.body.name) {
        errors.push('Name is required.');
    }

    if (!req.body.password) {
        errors.push('Password is required.');
    }

    if (req.body.password !== req.body.cf_pass) {
        errors.push('Password must match.');
    }

    const renter = await Renter.findOne({ email: req.body.email });

    if (renter) {
        errors.push('Existing email.');
    }

    if (errors.length) {
        // res.render('signup/renter', {
        //     errors: errors,
        //     values: req.body
        // });
        const data = {
            errors: errors
        }
        res.json(data);
        return;
    }


    next();
};


//owner validate
module.exports.postOwner = async (req, res, next) => {
    let errors = [];


    if (!req.body.email) {
        errors.push('Email is required');
    }

    if (!req.body.name) {
        errors.push('Name is required');
    }

    if (!req.body.id_card_number) {
        errors.push('Identificaton number is required');
    }

    if (!req.body.phone) {
        errors.push('Phone is required');
    }

    if (!req.body.address) {
        errors.push('Address is required');
    }

    if (!req.body.password) {
        errors.push('Password is required');
    }

    if (req.body.password !== req.body.cf_pass) {
        errors.push('Password must match');
    }

    const owner = await Owner.findOne({email: req.body.email});

    if (owner) {
        errors.push('Existing email.');
    }

    if (errors.length) {
        // res.render('signup/owner', {
        //     errors: errors,
        //     values: req.body
        // });
        const data = {
            errors: errors
        };
        res.json(data);
        return;
    }

    next();
};