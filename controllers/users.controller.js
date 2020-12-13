const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');
const Admin = require('../models/admin.model');


// /users/renter
module.exports.renter = (req, res) => {
    const id = req.signedCookies.userId;

    Renter.findById(id)
    .then(renter => res.json(renter))
    .catch(error => res.status(400).json('error:' + error));
}

// /users/owner
module.exports.admin = (req, res) => {
    const id = req.signedCookies.userId;

    Admin.findById(id)
    .then(admin => res.json(admin))
    .catch(error => res.status(400).json('error' + error));
}

// /users/admin
module.exports.owner = (req, res) => {
    const id = req.signedCookies.userId;

    Owner.findById(id)
    .then(owner => res.json(owner))
    .catch(error => res.status(400).json('error' + error));
}