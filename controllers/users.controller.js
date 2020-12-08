const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');
const Admin = require('../models/admin.model');


// /users/renter
module.exports.renter = (req, res) => {
    const id = req.session.user;

    Renter.findById(id)
    .then(renter => res.json(renter))
    .catch(error => res.status(400).json('error:' + error));
}

// /users/owner
module.exports.admin = (req, res) => {
    const id = req.session.user;

    Admin.findById(id)
    .then(admin => res.json(admin))
    .catch(error => res.status(400).json('error' + error));
}

// /users/admin
module.exports.owner = (req, res) => {
    const id = req.session.user;

    Owner.findById(id)
    .then(owner => res.json(owner))
    .catch(error => res.status(400).json('error' + error));
}