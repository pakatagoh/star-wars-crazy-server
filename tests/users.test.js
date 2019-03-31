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

describe('Protected Users routes', () => {
  beforeEach(() => {
    jwt.verify.mockResolvedValueOnce({ id: 1 });
  });
  afterEach(() => {
    jwt.verify.mockRestore();
  });

  test('[GET] should get user events with status 200', done => {
    const route = `/v1/users/events`;

    request(app)
      .get(route)
      .set('Cookie', 'token=aklsdjakldjas')
      .set('Origin', 'http://localhost:3000')
      .expect(200, done);
  });
});
