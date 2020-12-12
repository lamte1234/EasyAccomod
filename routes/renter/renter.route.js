const e = require('express');
const express = require('express');
const router = express.Router();

const controllers = require('../../controllers/renter_actions/renter.controller')

// /users/renter/search
router.post('/search', controllers.postSearch);
// /users/renter/post/:id
router.get('/post/:id', controllers.getPostByID);
// /users/renter/wishlist
router.get('/wishlist', controllers.wishlist);
// /users/renter/wishlist/:id
router.patch('/wishlist/:id', controllers.addWishlist);

module.exports = router;