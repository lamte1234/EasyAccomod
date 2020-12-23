const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer({dest: 'static/uploads/'});

const controllers = require('../../controllers/owner_actions/owner.controller');
const userControllers = require('../../controllers/users.controller');

const changePassMiddleware = require('../../middlewares/account.middleware');
const postMiddlewares = require('../../middlewares/post.middleware');
const accountMiddlewares = require('../../middlewares/account.middleware');
const editAuthMiddlewares = require('../../middlewares/auth.middleware');
const editPostMiddlewares = require('../../middlewares/edit_post.middleware');
const extendMiddleware = require('../../middlewares/extend.middleware')

// /users/owner/post
router.post('/post', uploads.array('image', 5), postMiddlewares.postValidation, 
            controllers.postOwnerPost);
// /users/owner/edit
router.get('/edit', controllers.getOwnerPost)
// /users/owner/edit/:id
router.get('/edit/:id', controllers.getOwnerPostByID);
router.put('/edit/:id', editPostMiddlewares.ownerEditPost, controllers.putEditOwnerPostByID);
// /users/owner/account
router.get('/account', controllers.getOwnerAccount);
router.put('/account', editAuthMiddlewares.ownerEditAccountAuth, accountMiddlewares.ownerChangeAccount, controllers.putOwnerAccountChange);
// /users/owner/change-password
router.patch('/change-password', changePassMiddleware.usersChangePassword, userControllers.patchChangePassword);
// /users/owner/all-post
router.get('/all-post', controllers.getAllPost);
// /user/owner/change-status/:id
router.patch('/change-status/:id', controllers.patchPostStatus);
// /users/owner/extend
router.get('/extend', controllers.getOvertimePost);
// /users/owner/extend/:id
router.patch('/extend/:id', extendMiddleware.timeExtendValidation, controllers.patchOvertimePostByID);
// /users/owner/notificatons
router.get('/notifications', controllers.getOwnerNotifications);
// /users/owoner/notifications/:id
router.patch('/notifications/:id', controllers.patchOwnerNotifications);

module.exports = router;