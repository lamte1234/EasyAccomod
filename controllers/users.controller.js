const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');
const Admin = require('../models/admin.model');


// /users/renter/:id
module.exports.renter = (req, res) => {
    const id = req.params.id;

    Renter.findById(id)
    .then(renter => res.json(renter))
    .catch(error => res.status(400).json('error:' + error));
}

// /users/owner/:id
module.exports.admin = (req, res) => {
    const id = req.params.id;

    Admin.findById(id)
    .then(admin => res.json(admin))
    .catch(error => res.status(400).json('error' + error));
}

// /users/admin/:id
module.exports.owner = (req, res) => {
    const id = req.params.id;
    Owner.findById(id)
    .then(owner => res.json(owner))
    .catch(error => res.status(400).json('error' + error));
}