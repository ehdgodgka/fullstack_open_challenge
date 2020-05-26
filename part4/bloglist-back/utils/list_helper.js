const groupBy = require('lodash.groupby');
const mapValues = require('lodash.mapvalues');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};
const favoriteBlog = (blogs) => {
  const mostLiked = (res, blog) => {
    return res.likes < blog.likes ? blog : res;
  };
  return blogs.reduce(mostLiked);
};
const mostBlogs = (blogs) => {
  const bloglistByAuthor = groupBy(blogs, 'author');
  const blogCountByAuthor = mapValues(bloglistByAuthor, (blogs) => blogs.length);
  let mostBlog = { author: null, blogs: 0 };
  for (let key in blogCountByAuthor) {
    if (blogCountByAuthor[key] >= mostBlog.blogs) {
      mostBlog.author = key;
      mostBlog.blogs = blogCountByAuthor[key];
    }
  }
  return mostBlog;
};

const mostLikes = (blogs) => {
  const likeCounter = (authorLikes, blog) => {
    console.log(authorLikes, blog);
    blog.author in authorLikes
      ? (authorLikes[blog.author] += blog.likes)
      : (authorLikes[blog.author] = blog.likes);
    return authorLikes;
  };
  const authorLikes = blogs.reduce(likeCounter, {});
  let mostLikes = { author: null, likes: 0 };
  for (let key in authorLikes) {
    if (authorLikes[key] >= mostLikes.likes) {
      mostLikes.author = key;
      mostLikes.likes = authorLikes[key];
    }
  }
  return mostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
