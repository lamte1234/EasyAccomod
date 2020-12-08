const express = require('express');
const router = express.Router();

const controllers = require('../controllers/users.controller');
const ownerControllers = require('../controllers/owner_actions/owner.controller')
const renterControlers = require('../controllers/renter_actions/renter.controller');
const ownerRoutes = require('./owner/owner.route');
const adminRoutes = require('./admin/admin.route');


router.get('/renter', controllers.renter);

router.get('/owner', controllers.owner);

router.get('/admin', controllers.admin);

router.use('/owner', ownerRoutes);
router.use('/admin', adminRoutes)



module.exports = router;