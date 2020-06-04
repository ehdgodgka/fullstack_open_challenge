const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

beforeEach(async () => {
  jest.setTimeout(30000);
  try {
    await User.deleteMany({});
    for (let newUser of helper.users) {
      const passwordHash = await bcrypt.hash(newUser.password, 10);
      const user = new User({ name: newUser.name, username: newUser.username, passwordHash });
      await user.save();
    }
  } catch (error) {
    return;
  }

});

describe('create user', () => {
  it('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();
    console.log(usersAtStart);
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error.message).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('name is shorter then allowed length (3)', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'salainen'
    };

    const result = await api.post('/api/users').send(newUser).expect(400);
    expect(result.body.error.message).toContain('shorter than the minimum allowed');
  });

  test('password is shorter then allowed length (3) ', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mickey mouse',
      name: 'jinijini Googoo',
      password: 'ha'
    };

    const result = await api.post('/api/users').send(newUser).expect(400);
    expect(result.body.error.message).toBe('password length should longer then 3');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
