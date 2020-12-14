const express = require('express');
const router = express.Router();

const controllers = require('../controllers/users.controller');
const ownerRoutes = require('./owner/owner.route');
const adminRoutes = require('./admin/admin.route');
const renterRoutes = require('./renter/renter.route');
const authMiddlewares = require('../middlewares/auth.middleware');

// /users/renter
router.get('/renter', authMiddlewares.renterAuth, controllers.renter);
// /users/owner 
router.get('/owner', controllers.owner);
// /users/admin
router.get('/admin', authMiddlewares.adminAuth, controllers.admin);

router.use('/owner', authMiddlewares.ownerAuth, ownerRoutes);
router.use('/admin', authMiddlewares.adminAuth, adminRoutes);
router.use('/renter', authMiddlewares.renterAuth, renterRoutes);



module.exports = router;