const blogRouter = require('express').Router();
const Blog = require('../models/blog');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};
blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);

  const result = await blog.save();
  res.json(result);
});

blogRouter.delete('/:id', async (req, res) => {
  const blogToDelete = await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogRouter.put('/:id', async (req, res) => {
  const result = await Blog.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
  res.json(result);
});

module.exports = blogRouter;
