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


// /users/owner/post
router.post('/post', uploads.array('image', 5), postMiddlewares.postValidation, 
            controllers.postOwnerPost);
// /users/owner/edit
router.get('/edit', controllers.getOwnerPost)
// /users/owner/edit/:id
router.get('/edit/:id', controllers.getOwnerPostByID);
router.put('/edit/:id', controllers.putEditOwnerPostByID);
// /users/owner/account
router.get('/account', controllers.getOwnerAccount);
router.put('/account', editAuthMiddlewares.ownerEditAccountAuth, accountMiddlewares.ownerChangeAccount, controllers.putOwnerAccountChange);
// /users/owner/change-password
router.patch('/change-password', changePassMiddleware.usersChangePassword, userControllers.patchChangePassword);


module.exports = router;