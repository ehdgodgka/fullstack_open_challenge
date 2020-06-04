const listHelper = require('../utils/list_helper');
const testHelper = require('./test_helper');
test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];
const blogs = testHelper.blogs;
describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('blogs list like total', () => {
    expect(listHelper.totalLikes(blogs)).toBe(34);
  });
});

describe('test favoriteBlog (find most liked blog)', () => {
  test('list have one blog equals that one ', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]);
  });
  test('list return most liked one', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});

describe('most blog', () => {
  test('return author and number of the most blog', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 });
  });
});

describe('most likes', () => {
  test('return info of the most liked author', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});
