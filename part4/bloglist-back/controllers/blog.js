const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, userame: 1 });
  res.json(blogs);
});

const decodeToken = (req, res, next) => {
  const result = jwt.verify(req.token, process.env.JWT_SECRET);
  if (!result) {
    next({ name: 'unAuthorized', message: 'invalid token' });
  } else {
    req.user = result;
    next();
  }
};

blogRouter.post('/', decodeToken, async (req, res, next) => {
  const { username, id } = req.user;

  const user = await User.findById(id);
  if (!user) {
    next({ name: 'unAuthorized', message: 'not registered' });
    return;
  }

  const blog = new Blog({ user: user._id, ...req.body });
  user.blogs = user.blogs.concat(blog._id);
  await user.save();
  const result = await blog.save();
  res.json(result);
});

blogRouter.delete('/:id', decodeToken, async (req, res, next) => {
  const { id } = req.user;

  const blogToDelete = await Blog.findById(req.params.id);

  if (blogToDelete.user.toString() === id.toString()) {
    await Blog.deleteOne(blogToDelete);
    res.status(204).end();
    return;
  }
  next({ name: 'unAuthorized', message: "don't have authority" });
});

blogRouter.put('/:id', async (req, res) => {
  const result = await Blog.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
  res.json(result);
});

module.exports = blogRouter;
