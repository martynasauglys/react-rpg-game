const UserController = require('./User/UserController');
const router = require('express').Router();

// Middlewares
const UserMiddleware = require('./User/Authenticator');

// User routes
router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);
router.get('/logout', UserMiddleware.authenticate, UserController.logout);
router.get('/getUser', UserMiddleware.authenticate, UserController.getUserData);

//
router.put('/buyItem', UserMiddleware.authenticate, UserController.userBuyItem);
router.put(
  '/sellItem',
  UserMiddleware.authenticate,
  UserController.userSellItem
);

module.exports = router;
