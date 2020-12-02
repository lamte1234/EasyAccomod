// maybe can delete

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

    if (user && user.is_approved === false) { // testing users/owner
        res.redirect('/users');
    }
    else{
        res.render('users/owner', {
            user : user
        });
    }
}