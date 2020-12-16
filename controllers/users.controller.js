const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');
const Admin = require('../models/admin.model');


// /users/renter
module.exports.renter = (req, res) => {
    const id = req.signedCookies.userId;

    Renter.findById(id)
    .then(renter => res.status(200).json(renter))
    .catch(error => res.status(500).send('server error'));
}

// /users/owner
module.exports.admin = (req, res) => {
    const id = req.signedCookies.userId;

    Admin.findById(id)
    .then(admin => res.status(200).json(admin))
    .catch(error => res.status(500).send('server error'));
}

// /users/admin
module.exports.owner = (req, res) => {
    const id = req.signedCookies.userId;

    Owner.findById(id)
    .then(owner => res.status(200).json(owner))
    .catch(error => res.status(500).send('server error'));
}