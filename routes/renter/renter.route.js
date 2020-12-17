const express = require('express');
const router = express.Router();

const controllers = require('../../controllers/renter_actions/renter.controller');
const userControllers = require('../../controllers/users.controller');

const changePassMiddleware = require('../../middlewares/account.middleware');
const reviewMiddleware = require('../../middlewares/review.middleware');

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
// /users/renter/change-password
router.patch('/change-password', changePassMiddleware.usersChangePassword, userControllers.patchChangePassword);
// /users/renter/review/:id
router.get('/review/:id', controllers.getAllReviewsByPostID);
router.post('/review/:id', reviewMiddleware.reviewValidation, controllers.postReviewByPostID);


module.exports = router;