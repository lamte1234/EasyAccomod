const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer({dest: '../../static/uploads/'});

const controllers = require('../../controllers/owner_actions/owner.controller')


router.post('/post', controllers.postOwnerPost);

router.get('/edit', controllers.getOwnerPost)

router.get('/edit/:id', controllers.getOwnerPostByID);
router.post('/edit/:id', controllers.postEditOwnerPostByID);

module.exports = router;