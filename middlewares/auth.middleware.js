const jwt = require('jsonwebtoken');

// put this middleware before any controllers that need protecting

module.exports.auth = (req, res, next) => {
    const token = req.header('auth-token');
    // maybe remove jwt using only session for auth
    if(!token){
        return;
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
    }
    catch(err){
        console.log(err);
        return;
    }

    if(!req.cookie.sid){
        return;
    }

    if(!req.cookie.sid === req.sessionID){
        return;
    }
    
    next();
}
