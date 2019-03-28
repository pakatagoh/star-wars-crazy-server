const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createUsers } = require('../seed');

beforeEach(async () => {
  await sequelize.sync({ force: true });
  await createUsers();
});

afterAll(async () => {
  sequelize.close();
});

describe('Auth routes test', () => {
  test('should create new user on signup', done => {
    const route = '/v1/auth/signup';
    request(app)
      .post(route)
      .set('Origin', 'http://localhost:3000')
      .send({
        firstName: 'test',
        email: 'test@gmail.com',
        password: '12345',
        imageUrl: 'https://randomuser.me/api/portraits/men/29.jpg',
      })
      .expect(201)
      .then(res => {
        const user = res.body;
        expect(user).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            firstName: 'test',
            lastName: '',
            imageUrl: 'https://randomuser.me/api/portraits/men/29.jpg',
          })
        );
        done();
      });
  });
});
