const jwt = require('jsonwebtoken');
const User = require('./UserModel');

authenticate = async (req, res, next) => {
  let token = req.header('token');
  try {
    // Verify JWT
    let decodedId = await jwt.verify(token, 'zazmas');
    let authenticatedUser = await User.findOne({
      _id: decodedId._id,
      'sessionTokens.token': token,
    });
    if (!authenticatedUser) throw 'Authentication failed';
    // Add user and token to request and go next()
    req.user = authenticatedUser;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports = {
  authenticate,
};
