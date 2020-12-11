const express = require('express');
const router = express.Router();

const controllers = require('../controllers/users.controller');
const ownerRoutes = require('./owner/owner.route');
const adminRoutes = require('./admin/admin.route');
const renterRoutes = require('./renter/renter.route');

// /users/renter
router.get('/renter', controllers.renter);
// /users/owner 
router.get('/owner', controllers.owner);
// /users/admin
router.get('/admin', controllers.admin);

router.use('/owner', ownerRoutes);
router.use('/admin', adminRoutes);
router.use('/renter', renterRoutes);



module.exports = router;