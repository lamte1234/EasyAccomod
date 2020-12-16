
const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');
const Wishlist = require('../models/wishlist.model');
const md5 = require('md5');


module.exports.postRenter = async (req, res) => {
    const extraPass = req.body.password + process.env.PASSWORD_EXTRA_SECRET;
    const dataRenter = {
        email: req.body.email,
        name: req.body.name,
        password: md5(extraPass)
    };
    
    const newRenter = await new Renter(dataRenter).save();
    const newWishlist = await new Wishlist({renter_id: newRenter._id, post_list: []}).save();
    res.status(201).json(newRenter);
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
        is_approved: false,
        editable: false
    };

    const newOwner = new Owner(dataOwner);
    newOwner.save()
    .then(owner => {
        res.status(201).json(owner);
    })
    .catch(err => res.status(500).send('server error'));
    
    
}