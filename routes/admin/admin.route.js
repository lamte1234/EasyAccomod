const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/admin_actions/admin.controller');

router.get('/accounts', controllers.getUnapprovedOwners);

router.get('/posts', controllers.getUnapprovedPosts);

router.post('/accounts/:id', controllers.postApprovedOwner);

router.post('/posts/:id', controllers.postApprovedPost);

module.exports = router;