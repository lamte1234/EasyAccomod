const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');


// renter validate
module.exports.postRenter = async (req, res, next) => {
    let errors = [];
    const email_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!req.body.email) {
        errors.push('Email is required.');
    }

    if(req.body.email && !req.body.email.match(email_re)){
        errors.push('Invalid email.');
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
    const email_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phone_re = /^[0-9]{10}$/;
    const id_num_re = /^[a-zA-Z0-9]{16}$/;

    if (!req.body.email) {
        errors.push('Email is required');
    }

    if(req.body.email && !req.body.email.match(email_re)){
        errors.push(req.body.email.match(email_re));
    }
    
    if (!req.body.name) {
        errors.push('Name is required');
    }

    if (!req.body.id_card_number) {
        errors.push('Identificaton number is required');
    }

    if(req.body.id_card_number && !req.body.id_card_number.match(id_num_re)){
        errors.push('Identification number must have 16 normal characters')
    }

    if (!req.body.phone) {
        errors.push('Phone is required');
    }

    if(req.body.phone && !req.body.phone.match(phone_re)){
        errors.push('Phone must have 10 digits.');
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
        const data = {
            errors: errors
        };
        res.json(data);
        return;
    }

    next();
};