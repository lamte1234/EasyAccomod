const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/admin_actions/admin.controller');

// /users/admin/accounts
router.get('/accounts', controllers.getUnapprovedOwners);
// /users/admin/posts
router.get('/posts', controllers.getUnapprovedPosts);
// /users/admin/accounts/:id
router.post('/accounts/:id', controllers.postApprovedOwner);
// /users/admin/posts/:id
router.post('/posts/:id', controllers.postApprovedPost);

module.exports = router;