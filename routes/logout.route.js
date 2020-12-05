const express = require('express');
const router = express.Router();
const controllers = require('../controllers/logout.controller');

router.post('/', controllers.logout);

module.exports = router;