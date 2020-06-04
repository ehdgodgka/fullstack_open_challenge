const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const testHelper = require('./test_helper');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');

let authorization = null;
const loginMocker = async (loginInfo) => {
  const result = await api.post('/api/login').send(loginInfo);
  return { authorization: `bearer ${result.body.token}` };
};
beforeAll(async () => {
  jest.setTimeout(30000);
  await Blog.deleteMany({});
  // login in first user, create 4 posts
  const { username, password } = testHelper.users[0];
  authorization = await loginMocker({ username, password });
  const testUser = await User.findOneAndUpdate({ username }, { blogs: [] }, { new: true });
  for (const blog of testHelper.blogs) {
    const blogDoc = new Blog({ user: testUser._id, ...blog });
    await blogDoc.save();
  }
});
describe('get post', () => {
  test('should get all bloglist from db ', async () => {
    const res = await testHelper.blogsInDb();
    expect(res).toHaveLength(testHelper.blogs.length);
  });

  test('unique identifier property of the blog posts should be named id', async () => {
    const res = await testHelper.blogsInDb();
    res.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

describe('add post: ', () => {
  test('should add data correctlys by post request', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    };
    await api
      .post('/api/blogs')
      .set(authorization)
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
      .set(authorization)
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
    await api.post('/api/blogs').set(authorization).send(newBlog).expect(400);
  });
  test('cannot add data without token', async () => {
    const newBlog = {
      title: 'no token but want it',
      author: 'Police should !',
      url: 'http://www.coronaVirusIsMakeMeSad',
      likes: 3
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .then((result) => result.body.error.name.includes('unAuthorized'));
  });
});

describe('delete data', () => {
  test("cannot delete others'post ", async () => {
    const { username, password } = testHelper.users[1];
    const authorizationSecond = await loginMocker({ username, password });
    const blogs = await testHelper.blogsInDb();
    const firstBlogId = blogs[0].id;
    await api.delete(`/api/blogs/${firstBlogId}`).set(authorizationSecond).expect(401);
  });
  test('without jwtToken cannot delete', async () => {
    const blogs = await testHelper.blogsInDb();
    const firstBlogId = blogs[0].id;
    try {
      await api.delete(`/api/blogs/${firstBlogId}`).expect(401);
    } catch (e) {
      console.log(e);
      return;
    }
  });

  test("delete first blog and check it's removed", async () => {
    const blogs = await testHelper.blogsInDb();
    const firstBlogId = blogs[0].id;
    await api.delete(`/api/blogs/${firstBlogId}`).set(authorization).expect(204);
    const blogsFinal = await testHelper.blogsInDb();
    expect(blogsFinal).toHaveLength(blogs.length - 1);
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
