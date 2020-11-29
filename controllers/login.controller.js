const db = require('../db');

module.exports.index = (req, res) => {
    res.render('login');
};

module.exports.postLogin = (req,res) => {
    let user = db.get(req.body.account_type).find({email: req.body.email}).value();

    res.render('home', {
        name: user.name
    })
};