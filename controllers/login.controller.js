const db = require('../db');

module.exports.index = (req, res) => {
    res.render('login');
};

module.exports.postLogin = (req, res) => {
    let user = db.get(req.body.account_type).find({email: req.body.email}).value();

    let user_type = req.body.account_type.replace('_account', '');

    req.session.user = user;
    if (user_type === 'renter'){
        res.redirect('/users/renter');
    }

    if (user_type === 'owner' && user.is_approved === true){
        res.redirect('/users/owner');
    }

    if (user_type === 'admin') {
        res.redirect('users/admin');
    }
};