const express = require('express');
const router = express.Router();

const db = require('../db');
const controllers = require('../controllers/users.controller');

router.get('/', controllers.unapproved);

router.get('/renter', controllers.renter);

// router.get('/owner', controllers.owner);

router.get('/admin', controllers.admin);

module.exports = router;