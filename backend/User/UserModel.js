const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  image: {
    type: String,
    default: 'https://icon-library.com/images/icon-profile/icon-profile-22.jpg',
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  health: {
    type: Number,
    default: 100,
    max: 100,
  },
  gold: {
    type: Number,
    default: 100,
  },
  inventory: [],
  fightsHistory: [
    {
      enemy: String,
      userWon: Boolean,
      timeStamp: Number,
    },
  ],
  sessionTokens: [
    {
      token: String,
    },
  ],
});

// Pass hashing
UserSchema.pre('save', function (next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hassedPassword) => {
        user.password = hassedPassword;
        next();
      });
    });
    // If password is not modified (Email or etc. is modified) go next()
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
