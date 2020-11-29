const express = require('express');
const router = express.Router();

const controllers = require('../controllers/login.controller');
const middlewares = require('../middlewares/login.middleware');

router.get('/', controllers.index);

router.post('/', middlewares.postLogin, controllers.postLogin)

module.exports = router;