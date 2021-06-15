const mongoose = require('mongoose');
const User = require('./UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  let user = new User(req.body);
  try {
    let alreadyExist = await User.findOne({ username: req.body.username });
    if (alreadyExist)
      return res.json({ success: false, msg: 'Username already exists' });
    let createdUser = await user.save();
    res.json({ createdUser, msg: 'User created successfully', success: true });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) throw "User doesn't exist";
    // Check password
    let passwordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatched)
      return res.json({ success: false, msg: 'Incorrect Password' });

    // Create JWT Token from User._id and add to User
    let token = await jwt
      .sign({ _id: user._id.toHexString() }, 'zazmas')
      .toString();
    user.sessionTokens.push({ token });
    await user.save();

    // Send response with token in headers
    return res
      .header('token', token)
      .json({ success: true, msg: 'User Logged', token: token });
  } catch (err) {
    res.status(401).json(err);
  }
};

logout = async (req, res) => {
  let token = req.token;
  let user = req.user;
  try {
    await user.update({ $pull: { sessionTokens: { token } } });
    res.json('successfull logout');
  } catch (e) {
    res.status(400).json(e);
  }
};

getUserData = (req, res) => {
  let user = req.user;
  res.json(user);
};

userBuyItem = async (req, res) => {
  let token = req.token;
  let user = req.user;
  let item = req.body;
  let itemPrice = req.body.price;

  try {
    await user.update({ $push: { inventory: item } });
    await user.update({ $inc: { gold: -itemPrice } });
    res.json(`${item} added`);
  } catch (e) {
    res.status(400).json(e);
  }
};

userSellItem = async (req, res) => {
  let token = req.token;
  let user = req.user;
  let sellPrice = req.body.sellPrice;
  let itemId = req.body.id;

  try {
    await user.update({ $pull: { inventory: { id: itemId } } });
    await user.update({ $inc: { gold: +sellPrice } });
    res.json('item removed');
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = {
  signUp,
  login,
  logout,
  getUserData,
  userBuyItem,
  userSellItem,
};
