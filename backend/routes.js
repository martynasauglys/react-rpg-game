const UserController = require('./User/UserController');
const router = require('express').Router();

// Middlewares
const UserMiddleware = require('./User/Authenticator');
const User = require('./User/UserModel');

// User routes
router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);
router.get('/logout', UserMiddleware.authenticate, UserController.logout);
router.get('/getUser', UserMiddleware.authenticate, UserController.getUserData);
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/user/:id', UserController.getUser);

//
router.put('/buyItem', UserMiddleware.authenticate, UserController.userBuyItem);
router.put(
  '/sellItem',
  UserMiddleware.authenticate,
  UserController.userSellItem
);
router.put(
  '/changeImage',
  UserMiddleware.authenticate,
  UserController.userChangeImage
);
router.put(
  '/removeItem',
  UserMiddleware.authenticate,
  UserController.removeItem
);
router.put(
  '/matchResults',
  UserMiddleware.authenticate,
  UserController.matchResults
);
router.put(
  '/updateHealth',
  UserMiddleware.authenticate,
  UserController.updateHealth
);
router.put(
  '/updateGold',
  UserMiddleware.authenticate,
  UserController.updateGold
);

module.exports = router;
