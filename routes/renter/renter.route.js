const e = require('express');
const express = require('express');
const router = express.Router();

const controllers = require('../../controllers/renter_actions/renter.controller')

// /users/renter/search
router.post('/search', controllers.postSearch);
// /users/renter/wishlist
router.get('/wishlist', controllers.wishlist);

module.exports = router;