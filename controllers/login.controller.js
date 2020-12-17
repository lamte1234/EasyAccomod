const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');
const Admin = require('../models/admin.model');
const Wishlist = require('../models/wishlist.model');


// /login
module.exports.postLogin = async (req, res) => {
    let model = Owner;

    if (req.body.account_type === 'renter_account'){
        model = Renter;
    }
    else if (req.body.account_type === 'owner_account'){
        model = Owner;
    }
    else if (req.body.account_type === 'admin_account'){
        model = Admin;
    };

    const user = await model.findOne({email: req.body.email});

    const user_type = req.body.account_type.replace('_account', '');

    let data = {
        user_type: user_type,
        ...user._doc
    }

    if(user_type === 'renter') {
        const wishlist = await Wishlist.findOne({renter_id: user._doc._id});
        data.wishlist = wishlist.post_list;
    }
    
    res.cookie('userType', user_type, {signed: true});
    res.cookie('userId', user._doc._id, {signed: true});
    res.status(200).json(data); // manage data sent later
};


