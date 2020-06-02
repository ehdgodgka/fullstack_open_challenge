const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const testHelper = require('./test_helper');
const mongoose = require('mongoose');
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of testHelper.blogs) {
    const blogDoc = new Blog(blog);
    await blogDoc.save();
  }
});
describe('what', () => {
  test('should get all bloglist from db ', async () => {
    const res = await testHelper.blogsInDb();
    expect(res).toHaveLength(testHelper.blogs.length);
  });

  test('unique identifier property of the blog posts should be named id', async () => {
    const res = await testHelper.blogsInDb();
    res.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

describe('add data: ', () => {
  test('should add data correctlys by post request', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const blogs = await testHelper.blogsInDb();
    expect(blogs.length).toBe(testHelper.blogs.length + 1);
    expect(blogs[blogs.length - 1].url).toBe(newBlog.url);
  });

  test('when request data miss likes property, It should be set default value 0', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const blogs = await testHelper.blogsInDb();
    expect(blogs[blogs.length - 1].likes).toBe(0);
  });

  test('url,title is missing and it occur error', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 3
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('delete data', () => {
  test("delete first blog and check it's removed", async () => {
    const blogs = await testHelper.blogsInDb();
    const firstBlogId = blogs[0].id;
    await api.delete(`/api/blogs/${firstBlogId}`).expect(204);
    const blogsFinal = await testHelper.blogsInDb();
    expect(blogsFinal).toHaveLength(testHelper.blogs.length - 1);
  });
});

describe('update data', () => {
  test('should increase likes', async () => {
    const blogs = await testHelper.blogsInDb();
    const firstBlogLikes = blogs[0].likes;
    const response = await api.put(`/api/blogs/${blogs[0].id}`);
    expect(response.body.likes).toBe(firstBlogLikes + 1);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
