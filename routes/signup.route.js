const express = require('express');
const router = express.Router();
const controller = require('../controllers/signup.controller')
const signupMiddleware = require('../middlewares/signup.middleware')



// post data
router.post('/renter', signupMiddleware.postRenter, controller.postRenter);

router.post('/owner', signupMiddleware.postOwner, controller.postOwner)

module.exports = router