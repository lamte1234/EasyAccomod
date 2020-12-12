const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/admin_actions/admin.controller');

// /users/admin/accounts
router.get('/accounts', controllers.getUnapprovedOwners);
// /users/admin/posts
router.get('/posts', controllers.getUnapprovedPosts);
// /users/admin/accounts/:id
router.patch('/accounts/:id', controllers.patchApprovedOwner);
// /users/admin/posts/:id
router.patch('/posts/:id', controllers.patchApprovedPost);

module.exports = router;