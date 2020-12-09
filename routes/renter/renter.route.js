const e = require('express');
const express = require('express');
const router = express.Router();

const controllers = require('../../controllers/renter_actions/renter.controller')

router.post('/search', controllers.postSearch);

router.get('/wishlist', controllers.wishlist);

module.exports = router;