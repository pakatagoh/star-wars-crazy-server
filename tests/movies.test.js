const request = require('supertest');
const app = require('../app');

jest.mock('../services/tmdb');
const tmdbServices = require('../services/tmdb');

describe('Movies route', () => {
  test('[GET] should respond with 200 if api responds with data', async () => {
    tmdbServices.tmdbApiGetMovie.mockResolvedValueOnce({ title: 'test title' });

    const route = '/v1/movies/tt12345';
    const res = await request(app)
      .get(route)
      .set('Origin', 'http://localhost:3000');

    expect(res.status).toEqual(200);
    expect(tmdbServices.tmdbApiGetMovie.mock.calls.length).toEqual(1);
    tmdbServices.tmdbApiGetMovie.mockReset();
  });

  test('[GET] should respond with 401 if something goes wrong with request', done => {
    const err = new Error('Simulated Error');
    err.status = 400;
    tmdbServices.tmdbApiGetMovie.mockRejectedValueOnce(err);

    const route = '/v1/movies/tt12345';
    request(app)
      .get(route)
      .set('Origin', 'http://localhost:3000')
      .expect(400)
      .then(() => {
        expect(tmdbServices.tmdbApiGetMovie.mock.calls.length).toEqual(1);
        return done();
      });
  });
});
