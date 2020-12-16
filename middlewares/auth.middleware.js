const Admin = require('../models/admin.model');
const Renter = require('../models/renter.model');
const Owner = require('../models/owner.model');

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
            if(admin){
                console.log('user logged in');
            }
            else if(!admin){
                res.status(401).send('Access denied');
                return;
            }
        })
        .catch(err => console.log(err))
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
            if(renter){
                console.log('user logged in');
            }
            else if(!renter){
                res.status(401).send('Access denied');
                return;
            }
        })
        .catch(err => console.log(err))
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

    
    const owner = await Owner.findById(req.signedCookies.userId);

    if(owner._doc.is_approved === false){
        res.status(401).send('Access denied');
        return;
    }
    if(!owner){
        res.status(401).send('Access denied');
        return;
    }
    
    next();
}

module.exports.ownerEditAccountAuth = async (req, res, next) => {
    const owner = await Owner.findById(req.signedCookies.userId);

    if(owner._doc.editable === false){
        res.status(401).send('Access denied');
        return;
    }

    next();
}

