const mongoose = require('mongoose');
const User = require('./UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAlgorithms } = require('json-web-token');

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
    let passwordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatched)
      return res.json({ success: false, msg: 'Incorrect Password' });
    let token = await jwt
      .sign({ _id: user._id.toHexString() }, 'zazmas')
      .toString();
    user.sessionTokens.push({ token });
    await user.save();

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

getAllUsers = async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  } catch (e) {
    console.log(e);
  }
};

userBuyItem = async (req, res) => {
  let user = req.user;
  let item = req.body;
  let itemPrice = req.body.price;

  try {
    await user.update({ $push: { inventory: item } });
    await user.update({ $inc: { gold: -itemPrice } });
    res.json('item added');
  } catch (e) {
    res.status(400).json(e);
  }
};

userSellItem = async (req, res) => {
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

userChangeImage = async (req, res) => {
  let user = req.user;
  let imageNew = req.body.image;

  try {
    await user.update({ image: imageNew });
    res.json('image updated');
  } catch (e) {
    res.status(400).json(e);
  }
};

removeItem = async (req, res) => {
  let user = req.user;
  let itemId = req.body.id;

  try {
    await user.update({ $pull: { inventory: { id: itemId } } });
  } catch (e) {
    res.status(400).json(e);
  }
};

getUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findById(id).then((data) => res.json(data));
  } catch (e) {
    res.status(400).json(e);
  }
};

matchResults = async (req, res) => {
  let user = req.user;
  let record = req.body;

  try {
    await user.update({ $push: { fightsHistory: record } });
  } catch (e) {
    res.status(400).json(e);
  }
};

updateHealth = async (req, res) => {
  let user = req.user;
  let newHealth = req.body.health;

  try {
    await user.update({ health: newHealth });
  } catch (e) {
    res.status(400).json(e);
  }
};

updateGold = async (req, res) => {
  let user = req.user;
  let add = req.body.add;

  try {
    await user.update({ $inc: { gold: +add } });
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
  userChangeImage,
  removeItem,
  getAllUsers,
  getUser,
  matchResults,
  updateHealth,
  updateGold,
};
