
const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');
const Admin = require('../models/admin.model');

module.exports.postLogin = async (req, res, next) => {
   
    let model;

    if (req.body.account_type === 'renter_account'){
        model = Renter;
    }
    else if (req.body.account_type === 'owner_account'){
        model = Owner;
    }
    else if (req.body.account_type === 'admin_account'){
        model = Admin;
    };

    const user = await model.findOne({email: req.body.email});

    let errors = [];

    if(!req.body.email){
        errors.push('Email is required.');
    }

    if(!req.body.password){
        errors.push('Password is required.');
    }

    if((!user && req.body.email && req.body.password) ||
        (user && req.body.password !== user.password && req.body.password)){
        errors.push('Wrong password or email.');
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