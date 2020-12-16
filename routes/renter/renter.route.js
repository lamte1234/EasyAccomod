const e = require('express');
const express = require('express');
const router = express.Router();

const controllers = require('../../controllers/renter_actions/renter.controller');
const userControllers = require('../../controllers/users.controller');

const changePassMiddleware = require('../../middlewares/account.middleware');

// /users/renter/explore
router.get('/explore', controllers.getExplore);
// /users/renter/search
router.get('/search', controllers.getSearch);
// /users/renter/post/:id
router.get('/post/:id', controllers.getPostByID);
// /users/renter/wishlist
router.get('/wishlist', controllers.wishlist);
// /users/renter/wishlist/:id
router.patch('/wishlist/:id', controllers.addWishlist);
// /users/admin/change-password
router.patch('/change-password', changePassMiddleware.usersChangePassword, userControllers.patchChangePassword);

module.exports = router;