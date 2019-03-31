const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { sequelize, User, Event } = require('../models');
const { createUsers } = require('../seed');

jest.mock('jsonwebtoken');

const createEvents = async () => {
  const user1 = await User.create({
    firstName: 'jesstern',
    email: 'jesstern@gmail.com',
    password: 'password',
    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
  });
  const user2 = await User.create({
    firstName: 'angeline',
    email: 'angeline@gmail.com',
    password: 'password',
    imageUrl: 'https://randomuser.me/api/portraits/women/51.jpg',
  });

  const events = [
    {
      name: 'Star Wars Fun Fun',
      description:
        'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
      eventStart: '2019-03-28T14:03:42.000Z',
      eventEnd: '2019-03-28T14:03:42.000Z',
      organizerId: 3,
      imageUrl:
        'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    },
    {
      name: 'Chewie Chew Chew',
      description:
        'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
      eventStart: '2019-03-28T14:03:42.000Z',
      eventEnd: '2019-03-28T14:03:42.000Z',
      organizerId: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    },
    {
      name: 'Millenium Pigeon',
      description:
        'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
      eventStart: '2019-03-28T14:03:42.000Z',
      eventEnd: '2019-03-28T14:03:42.000Z',
      organizerId: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    },
    {
      name: 'Han Together',
      description:
        'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
      eventStart: '2019-03-28T14:03:42.000Z',
      eventEnd: '2019-03-28T14:03:42.000Z',
      organizerId: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    },
    {
      name: 'The Force is With The Event',
      description:
        'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
      eventStart: '2019-03-28T14:03:42.000Z',
      eventEnd: '2019-03-28T14:03:42.000Z',
      organizerId: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    },
    {
      name: 'I am your Father...just today',
      description:
        'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
      eventStart: '2019-03-28T14:03:42.000Z',
      eventEnd: '2019-03-28T14:03:42.000Z',
      organizerId: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    },
  ];

  const promisedEvents = await Promise.all(
    events.map(async event => Event.create(event, { include: [{ association: User.Organizer, as: 'organizer' }] }))
  );

  await promisedEvents[0].setAttendees([user1.id, user2.id]);
};

beforeEach(async () => {
  await sequelize.sync({ force: true });
  await createUsers();
  await createEvents();
});

afterAll(async () => {
  sequelize.close();
});

describe('unprotected Events route', () => {
  test('[GET] should get all events', async done => {
    const route = '/v1/events';
    const expectedEvents = [
      {
        name: 'Star Wars Fun Fun',
        description:
          'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
        eventStart: '2019-03-28T14:03:42.000Z',
        eventEnd: '2019-03-28T14:03:42.000Z',
        organizerId: 3,
        imageUrl:
          'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
      },
      {
        name: 'Chewie Chew Chew',
        description:
          'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
        eventStart: '2019-03-28T14:03:42.000Z',
        eventEnd: '2019-03-28T14:03:42.000Z',
        organizerId: 2,
        imageUrl:
          'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
      },
      {
        name: 'Millenium Pigeon',
        description:
          'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
        eventStart: '2019-03-28T14:03:42.000Z',
        eventEnd: '2019-03-28T14:03:42.000Z',
        organizerId: 1,
        imageUrl:
          'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
      },
      {
        name: 'Han Together',
        description:
          'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
        eventStart: '2019-03-28T14:03:42.000Z',
        eventEnd: '2019-03-28T14:03:42.000Z',
        organizerId: 1,
        imageUrl:
          'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
      },
      {
        name: 'The Force is With The Event',
        description:
          'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
        eventStart: '2019-03-28T14:03:42.000Z',
        eventEnd: '2019-03-28T14:03:42.000Z',
        organizerId: 1,
        imageUrl:
          'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
      },
      {
        name: 'I am your Father...just today',
        description:
          'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
        eventStart: '2019-03-28T14:03:42.000Z',
        eventEnd: '2019-03-28T14:03:42.000Z',
        organizerId: 1,
        imageUrl:
          'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
      },
    ];
    request(app)
      .get(route)
      .set('Origin', 'http://localhost:3000')
      .expect(200, done)
      .expect(res => {
        const actual = res.body;
        actual.forEach((event, index) => {
          expect(event).toEqual(expect.objectContaining(expectedEvents[index]));
        });
      });
  });

  test('[GET] should get one event if event exists ', async done => {
    const expectedEvent = {
      name: 'Han Together',
      description:
        'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
      eventStart: '2019-03-28T14:03:42.000Z',
      eventEnd: '2019-03-28T14:03:42.000Z',
      organizerId: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    };
    const route = `/v1/events/4`;

    request(app)
      .get(route)
      .set('Origin', 'http://localhost:3000')
      .expect(200, done)
      .expect(res => {
        const actual = res.body;
        expect(actual).toEqual(expect.objectContaining(expectedEvent));
      });
  });

  test('[GET] should received 404 status if one event if event does not exists ', async done => {
    const route = `/v1/events/200`;

    request(app)
      .get(route)
      .set('Origin', 'http://localhost:3000')
      .expect(404, done);
  });
});

describe('Authentication for events route', () => {
  test('[POST] should receive 401 status if no token is provided ', done => {
    const route = `/v1/events`;

    request(app)
      .post(route)
      .send({
        name: 'Test Event name',
        description:
          'Test event description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
        eventStart: '2019-03-28T14:03:42.000Z',
        eventEnd: '2019-03-28T14:03:42.000Z',
        organizerId: 1,
        imageUrl:
          'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
      })
      .set('Origin', 'http://localhost:3000')
      .expect(401, done);
  });

  test('[POST] should receive 401 status if token provided is not valid', done => {
    const route = `/v1/events`;

    request(app)
      .post(route)
      .set('Cookie', 'token=aklsdjakldjas')
      .send({
        name: 'Test Event name',
        description:
          'Test event description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
        eventStart: '2019-03-28T14:03:42.000Z',
        eventEnd: '2019-03-28T14:03:42.000Z',
        organizerId: 1,
        imageUrl:
          'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
      })
      .set('Origin', 'http://localhost:3000')
      .expect(401, done);
  });
});
