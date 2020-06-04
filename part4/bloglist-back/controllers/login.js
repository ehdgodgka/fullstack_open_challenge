const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, res, next) => {
  const loginInfo = req.body;
  const user = await User.findOne({ username: loginInfo.username });
  console.log(user);
  if (!user) {
    next({ name: 'LoginError', message: 'unregistered user' });
    return;
  }

  const passwordCorrect = await bcrypt.compare(loginInfo.password, user.passwordHash);

  console.log(passwordCorrect);
  if (!passwordCorrect) {
    next({ name: 'LoginError', message: 'wrong password' });
    return;
  }
  const userForToken = {
    username: user.username,
    id: user._id
  };
  const token = jwt.sign(userForToken, process.env.JWT_SECRET);
  res.json({ token, name: user.name, username: user.username });
});

module.exports = loginRouter;
