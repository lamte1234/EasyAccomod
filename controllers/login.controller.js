const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');
const Admin = require('../models/admin.model');

module.exports.index = (req, res) => {
    res.render('login');
};

module.exports.postLogin = async (req, res) => {
    let model;

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

    req.session.user = user;

    if (user_type === 'renter'){
        res.redirect('/users/renter');
    }
    else if (user_type === 'owner' && user.is_approved === true){
        res.redirect('/users/owner');
    }
    else if (user_type === 'owner' && user.is_approved === false){
        res.redirect('/users');
    }
    else if (user_type === 'admin') {
        res.redirect('users/admin');
    }
};


/// need using encryption to hash and salt password