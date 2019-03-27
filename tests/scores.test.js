const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { sequelize, User } = require('../models');
const createUsers = require('../seed');

jest.mock('jsonwebtoken');
jest.mock('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await createUsers();
});

afterAll(async () => {
  sequelize.close();
});

describe('Scores route', () => {
  test('should update score if score does not exist for user', done => {
    jwt.verify.mockResolvedValueOnce({ id: 10 });

    User.findOne.mockResolvedValueOnce({
      getScore() {
        return null;
      },
      setScore() {
        return Promise.resolve({ id: 1, firstName: 'pakata' });
      },
    });
    const route = '/v1/scores';
    request(app)
      .post(route)
      .set('Origin', 'http://localhost:3000')
      .set('Cookie', 'token=12345')
      .send({ score: 10 })
      .expect(202, { score: 10 }, done);
  });

  test('should return same score if existing score is greater or equal to received score', done => {
    jwt.verify.mockResolvedValueOnce({ id: 10 });

    User.findOne.mockResolvedValueOnce({
      getScore() {
        return Promise.resolve(20);
      },
      setScore() {
        return Promise.resolve({ id: 1, firstName: 'pakata' });
      },
    });
    const route = '/v1/scores';
    request(app)
      .post(route)
      .set('Origin', 'http://localhost:3000')
      .set('Cookie', 'token=12345')
      .send({ score: 10 })
      .expect(202, { score: 20 }, done);
  });
});
