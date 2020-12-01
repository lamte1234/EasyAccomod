
const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model')
const md5 = require('md5');

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
    const extraPass = req.body.password + process.env.PASSWORD_EXTRA_SECRET;
    const dataRenter = {
        email: req.body.email,
        name: req.body.name,
        password: md5(extraPass),
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
    const extraPass = req.body.password + process.env.PASSWORD_EXTRA_SECRET;
    const dataOwner = {
        email: req.body.email,
        name: req.body.name,
        id_card_number: req.body.id_card_number,
        phone: req.body.phone,
        address: req.body.address,
        password: md5(extraPass),
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