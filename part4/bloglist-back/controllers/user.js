const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1 });
  res.json(users);
});
userRouter.post('/', async (req, res, next) => {
  const body = req.body;
  const saltRounds = 10;
  let passwordHash;
  if (body.password.length < 3) {
    next({ name: 'ValidationError', message: 'password length should longer then 3' });
    return;
  }
  passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = userRouter;
