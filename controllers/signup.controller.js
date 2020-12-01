const db = require('../db');
const shortid = require('shortid');
const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model')

module.exports.index = (req, res) => {
    res.render('signup/signup');
};

module.exports.renter = (req, res) => {
    res.render('signup/renter');
};

module.exports.owner = (req, res) => {
    res.render('signup/owner');
};

module.exports.postRenter = (req, res) => {
    let dataRenter = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        wishlist: [],
        report: []
    };

    Renter.create(dataRenter, (err, newRenter) => {
        if (err) {
            return 'Server error.';
        }
    });
    

    req.session.user = dataRenter;

    res.redirect('/users/renter');
};

module.exports.postOwner = (req, res) => {
    let dataOwner = {
        email: req.body.email,
        name: req.body.name,
        id_card_number: req.body.id_card_number,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password,
        is_approved: false
    };

    Owner.create(dataOwner, (err, newOwner) => {
        if(err){
            return 'Server error.'
        }
    })
    
    req.session.user = dataOwner;
    res.redirect('/users');
}