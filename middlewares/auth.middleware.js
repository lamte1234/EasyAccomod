const Admin = require('../models/admin.model');
const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');
const { owner } = require('../controllers/users.controller');

// -----------------ADMIN--------------------------------
module.exports.adminAuth =  (req, res, next) => {
    if(!req.signedCookies.userId){
        res.status(401).send('Access denied');
        return;
    }

    if(!req.signedCookies.userType){
        res.status(401).send('Access denied');
        return;
    }

    if(req.signedCookies.userType !== 'admin'){
        res.status(401).send('Access denied');
        return;
    }

    if(req.signedCookies.userId){
        Admin.findById(req.signedCookies.userId)
        .then(admin => {
            if(!admin){
                res.status(401).send('Access denied');
                return;
            }
        })
        .catch(err => res.status(500).send('server error'))
    }
    next();
}

// -----------------------RENTER-------------------------------
module.exports.renterAuth = (req, res, next) => {
    if(!req.signedCookies.userId){
        res.status(401).send('Access denied');
        return;
    }

    if(!req.signedCookies.userType){
        res.status(401).send('Access denied');
        return;
    }

    if(req.signedCookies.userType !== 'renter'){
        res.status(401).send('Access denied');
        return;
    }

    if(req.signedCookies.userId){
        Renter.findById(req.signedCookies.userId)
        .then(renter => {
            if(!renter){
                res.status(401).send('Access denied');
                return;
            }
        })
        .catch(err => res.status(500).send('server error'))
    }
    next();
}


// -----------------------OWNER-----------------------------
module.exports.ownerAuth = async (req, res, next) => {
    if(!req.signedCookies.userId){
        res.status(401).send('Access denied');
        return;
    }

    if(!req.signedCookies.userType){
        res.status(401).send('Access denied');
        return;
    }

    if(req.signedCookies.userType !== 'owner'){
        res.status(401).send('Access denied');
        return;
    }

    try {
        const owner = await Owner.findById(req.signedCookies.userId);

        if(!owner){
            res.status(401).send('Access denied');
            return;
        }

        if(owner._doc.is_approved === false){
            res.status(401).send('Access denied');
            return;
        }
    }
    catch(err) {
        res.status(500).send('server error');
    }

    next();
}

module.exports.ownerEditAccountAuth = (req, res, next) => {
    Owner.findById(req.signedCookies.userId)
    .then(owner => {
        if(owner.editable === false) {
            res.status(401).send('Access denied');
            return;
        }
    })
    .catch(err => res.status(500).send('server error'));

    next();
}

