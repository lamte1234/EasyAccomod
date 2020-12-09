const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');
const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');

// /login
module.exports.postLogin = async (req, res) => {
    let model = Renter;

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

    let user_type = req.body.account_type.replace('_account', '');

    const data = {
        user_type: user_type,
        ...user._doc
    }
    const token = jwt.sign({_id: user._doc._id}, process.env.TOKEN_SECRET);
    req.session.user_type = user_type;
    req.session.user = user._doc._id;
    res.header('auth-token', token);
    res.status(200).send('Success');
    res.json(data);
};


