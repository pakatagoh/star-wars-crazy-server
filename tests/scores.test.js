const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { sequelize, User, Score } = require('../models');
const createUsers = require('../seed');

jest.mock('jsonwebtoken');

beforeEach(async () => {
  await sequelize.sync({ force: true });
  await createUsers();
});

afterAll(async () => {
  sequelize.close();
});

describe('Scores route', () => {
  test('[POST] should update score if score does not exist for existing user', async done => {
    const foundUser = await User.findOne({ where: { firstName: 'nicole' } });

    jwt.verify.mockResolvedValueOnce({ id: foundUser.id });

    const route = '/v1/scores';
    request(app)
      .post(route)
      .set('Origin', 'http://localhost:3000')
      .set('Cookie', 'token=12345')
      .send({ score: 10 })
      .expect(202, { score: 10 }, done);
  });

  test('[POST] should return same score if existing score is greater or equal to received score', async done => {
    const foundUser = await User.findOne({ where: { firstName: 'sabrina' } });
    jwt.verify.mockResolvedValueOnce({ id: foundUser.id });

    const route = '/v1/scores';
    request(app)
      .post(route)
      .set('Origin', 'http://localhost:3000')
      .set('Cookie', 'token=12345')
      .send({ score: 1 })
      .expect(202, { score: 8 }, done);
  });

  test('[GET] should return an list of maximum 5 users with descending scores', async done => {
    const expected = [
      {
        firstName: 'nipun',
        email: 'nipun@gmail.com',
        imageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
        score: 11,
      },
      {
        firstName: 'jerome',
        email: 'jerom@gmail.com',
        imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
        score: 9,
      },
      {
        firstName: 'yingqi',
        email: 'yingqi@gmail.com',
        imageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
        score: 9,
      },
      {
        firstName: 'sabrina',
        email: 'sabrina@gmail.com',
        imageUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
        score: 8,
      },
      {
        firstName: 'nicholas',
        email: 'nicholas@gmail.com',
        imageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
        score: 7,
      },
    ];

    const route = '/v1/scores';
    request(app)
      .get(route)
      .set('Origin', 'http://localhost:3000')
      .then(res => {
        const actual = res.body;
        actual.forEach((item, index) => {
          expect(item).toEqual(expect.objectContaining(expected[index]));
        });
        done();
      });
  });
});
