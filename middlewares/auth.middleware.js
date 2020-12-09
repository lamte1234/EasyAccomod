module.exports.auth = (req, res, next) => {
    if(!req.sessionID){
        res.status(401).send('Access Denied.');
        return;
    }


    if(!req.cookies.sid){
        res.status(401).send('Access Denied.');
        return;
    }

    if(req.cookies.sid !== req.sessionID){
        res.status(401).send('Access Denied.');
        return;
    }

    if(req.sessionID && req.cookies.sid && req.sessionID !== req.cookies.sid){
        res.status(401).send('Access Denied.');
        return;
    }
    
    next();
}

module.exports.adminAuth = (req, res, next) => {
    if(!req.sessionID){
        res.status(401).send('Access Denied.');
        return;
    }

    if(!req.cookies.sid){
        res.status(401).send('Access Denied.');
        return;
    }

    if(req.sessionID && req.cookies.sid && req.sessionID !== req.cookies.sid){
        res.status(401).send('Access Denied.');
        return;
    }

    if(req.session.user_type !== 'admin') {
        res.status(401).send('Access Denied.');
        return;
    }

    next();
}

module.exports.renterAuth = (req, res, next) => {
    if(!req.sessionID){
        res.status(401).send('Access Denied.');
        return;
    }

    if(!req.cookies.sid){
        res.status(401).send('Access Denied.');
        return;
    }

    if(req.sessionID && req.cookies.sid && req.sessionID !== req.cookies.sid){
        res.status(401).send('Access Denied.');
        return;
    }

    if(req.session.user_type !== 'renter') {
        res.status(401).send('Access Denied.');
        return;
    }

    next();
}

module.exports.adminAuth = (req, res, next) => {
    if(!req.sessionID){
        res.status(401).send('Access Denied.');
        return;
    }

    if(!req.cookies.sid){
        res.status(401).send('Access Denied.');
        return;
    }

    if(req.sessionID && req.cookies.sid && req.sessionID !== req.cookies.sid){
        res.status(401).send('Access Denied.');
        return;
    }

    if(req.session.user_type !== 'owner') {
        res.status(401).send('Access Denied.');
        return;
    }

    next();
}