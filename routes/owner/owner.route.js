const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer({dest: 'static/uploads/'});

const controllers = require('../../controllers/owner_actions/owner.controller')

// /users/owner/post
router.post('/post', uploads.array('image', 5),controllers.postOwnerPost);
// /users/owner/edit
router.get('/edit', controllers.getOwnerPost)
// /users/owner/edit/:id
router.get('/edit/:id', controllers.getOwnerPostByID);
router.post('/edit/:id', controllers.postEditOwnerPostByID);

module.exports = router;