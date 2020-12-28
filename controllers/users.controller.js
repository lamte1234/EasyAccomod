const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');
const Admin = require('../models/admin.model');
const md5 = require('md5');


// /users/renter
module.exports.renter = (req, res) => {
    const id = req.signedCookies.userId;

    Renter.findById(id)
    .then(renter => res.status(200).json(renter))
    .catch(error => res.status(500).send('server error'));
}

// /users/admin
module.exports.admin = (req, res) => {
    const id = req.signedCookies.userId;

    Admin.findById(id)
    .then(admin => res.status(200).json(admin))
    .catch(error => res.status(500).send('server error'));
}

// /users/owner
module.exports.owner = (req, res) => {
    const id = req.signedCookies.userId;

    Owner.findById(id)
    .then(owner => res.status(200).json(owner))
    .catch(error => res.status(500).send('server error'));
}

// /users/[admin, renter, owner]/change-password
module.exports.patchChangePassword = async (req, res) => {
    const id = req.signedCookies.userId;
    const user_type = req.signedCookies.userType;
    let user;

    const newPassword = md5(req.body.new_password + process.env.PASSWORD_EXTRA_SECRET);

    if(user_type === "renter"){
        try{
            user = await Renter.findByIdAndUpdate(id, {password: newPassword});
            res.status(200).send('success');
        }
        catch(err) {
            res.status(500).send('server error');
        }
    }
    else if(user_type === "owner"){
        try {
            user = await Owner.findByIdAndUpdate(id, {password: newPassword});
            res.status(200).send('success');
        }
        catch(err) {
            res.status(500).send('server error');
        }
    }
    else if(user_type === "admin"){
        try {
            user = await Admin.findByIdAndUpdate(id, {password: newPassword});
            res.status(200).send('success');
        }
        catch(err) {
            res.status(500).send('server error');
        }
    }
}