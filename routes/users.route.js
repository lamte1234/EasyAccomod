const express = require('express');
const router = express.Router();

const controllers = require('../controllers/users.controller');
const ownerControllers = require('../controllers/owner_actions/owner.controller')
const renterControlers = require('../controllers/renter_actions/renter.controller');


router.get('/renter/:id', controllers.renter);

// router.get('/renter/:id/wishlist', renterControlers.wishlist);

router.get('/owner/:id', controllers.owner);

router.get('/admin/:id', controllers.admin);

// router.post('/owner/:id/post', ownerControllers.postOwnerPost);

// router.post('/renter/:id/search', renterControlers.postSearch);


module.exports = router;