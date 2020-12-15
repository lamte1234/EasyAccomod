const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/admin_actions/admin.controller');
const authMiddlewares = require('../../middlewares/auth.middleware');

// /users/admin/accounts
router.get('/accounts', controllers.getUnapprovedOwners);
// /users/admin/posts
router.get('/posts', controllers.getUnapprovedPosts);
// /users/admin/accounts/:id
router.patch('/accounts/:id', controllers.patchApprovedOwner);
// /users/admin/posts/:id
router.patch('/posts/:id', controllers.patchApprovedPost);
router.get('/posts/:id', controllers.getUnapprovedPostByID);
// /users/admin/edit-auth
router.get('/edit-auth', controllers.getUneditableOwners);
// /users/admin/edit-auth/:id
router.patch('/edit-auth/:id', controllers.patchEditAuthOwner);

module.exports = router;