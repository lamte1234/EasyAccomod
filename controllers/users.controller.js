
module.exports.unapproved = (req, res) => {
    let user = req.session.user;

    res.render('users/unapproved', {
        user: user
    });
}

module.exports.renter = (req, res) => {
    let user = req.session.user;

    res.render('users/renter', {
        user: user
    });
}

module.exports.admin = (req, res) => {
    let user = req.session.user;

    res.render('users/admin', {
        user : user
    });
}

module.exports.owner = (req, res) => {
    let user = req.session.user;

    if (user.is_approved === false) {
        res.redirect('/users');
    }
    else{
        res.render('users/owner', {
            user : user
        });
    }
}