
const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model')
const md5 = require('md5');


module.exports.postRenter = (req, res) => {
    const extraPass = req.body.password + process.env.PASSWORD_EXTRA_SECRET;
    const dataRenter = {
        email: req.body.email,
        name: req.body.name,
        password: md5(extraPass)
    };
    
    const newRenter = new Renter(dataRenter);
    newRenter.save()
    .then(renter => {
        req.session.user = renter._id;
        req.session.user_type = 'renter';
        res.status(200).json(renter); 
    })
    .catch(err => console.log('server error'));
    
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
        req.session.user = owner._id;
        req.session.user_type = 'owner';
        res.status(200).json(owner);
    })
    .catch(err => console.log(err));
    
    
}