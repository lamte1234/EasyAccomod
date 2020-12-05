
const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');
const Admin = require('../models/admin.model');
const md5 = require('md5');

module.exports.postLogin = async (req, res, next) => {
   
    let model = Renter;

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
    const email_re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!req.body.email){
        errors.push('Email is required.');
    }

    if(req.body.email && !req.body.email.match(email_re)){
        errors.push('Invalid email.')
    }

    if(!req.body.password){
        errors.push('Password is required.');
    }

    const extraPass = req.body.password + process.env.PASSWORD_EXTRA_SECRET;
    const hashPass = md5(extraPass);

    if((!user && req.body.email && req.body.password) ||
        (user && hashPass!== user.password && req.body.password)){
        errors.push('Wrong password or email.');
    }

    if(errors.length){
        const data = {
            errors: errors
        }
        res.json(data);

        return;
    }


    next();
}