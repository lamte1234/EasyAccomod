const db = require('../db');
const shortid = require('shortid');

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
        id: shortid.generate(),
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    };
    // need handling show post 
    db.get('renter_account').push(dataRenter).write();
    res.render('home', {
        name: req.body.name
    });
};

module.exports.postOwner = (req, res) => {
    let dataOwner = {
        id: shortid.generate(),
        email: req.body.email,
        name: req.body.name,
        id_card_number: req.body.id_card_number,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password
    };

    db.get('owner_account').push(dataOwner).write();
    //need handling account approvement waiting
    res.render('home', {
        name: req.body.name
    });
}