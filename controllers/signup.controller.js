
const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model')
const jwt = require('jsonwebtoken');
const md5 = require('md5');


module.exports.postRenter = (req, res) => {
    const extraPass = req.body.password + process.env.PASSWORD_EXTRA_SECRET;
    const dataRenter = {
        email: req.body.email,
        name: req.body.name,
        password: md5(extraPass),
        wishlist: [],
        report: []
    };
    
    const newRenter = new Renter(dataRenter);
    newRenter.save()
    .then(renter => {
        const token = jwt.sign({_id: renter._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token);
        res.json(renter); 
    })
    .catch(err => console.log('server error'));

    
    req.session.user = dataRenter;
    
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

    const newOwner = new Owner(dataOwner);
    newOwner.save()
    .then(owner => {
        const token = jwt.sign({_id: owner._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token);
        res.json(owner); //or message success
    })
    .catch(err => console.log('server error'));
    
    req.session.user = dataOwner;
}