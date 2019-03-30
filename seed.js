const { User, Score, Event } = require('./models');

const createUsers = async () => {
  await User.create({
    firstName: 'pakata',
    lastName: 'goh',
    email: 'pakatagohlh@gmail.com',
    password: 'password',
    imageUrl: 'https://avatars1.githubusercontent.com/u/37908805?s=460&v=4',
  });

  await User.create({
    firstName: 'piwei',
    email: 'piwei@gmail.com',
    password: 'password',
    imageUrl: 'https://randomuser.me/api/portraits/women/62.jpg',
  });

  await User.create({
    firstName: 'sabrina',
    email: 'sabrina@gmail.com',
    password: 'password',
    imageUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
  });

  await User.create({
    firstName: 'nicholas',
    email: 'nicholas@gmail.com',
    password: 'password',
    imageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
  });
  const createdEvent = await User.create(
    {
      firstName: 'timothy',
      email: 'timothy@gmail.com',
      password: 'password',
      imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
    },
    { include: [Score] }
  );
  await User.create(
    {
      firstName: 'huitian',
      email: 'huitian@gmail.com',
      password: 'password',
      imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      score: { value: 2 },
    },
    { include: [Score, Event] }
  );
  await User.create(
    {
      firstName: 'jerome',
      email: 'jerom@gmail.com',
      password: 'password',
      imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
      score: { value: 2 },
    },
    { include: [Score] }
  );
  await User.create({
    firstName: 'nipun',
    email: 'nipun@gmail.com',
    password: 'password',
    imageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
  });
  await User.create(
    {
      firstName: 'yingqi',
      email: 'yingqi@gmail.com',
      password: 'password',
      imageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
      score: { value: 1 },
    },
    { include: [Score] }
  );
  await User.create({
    firstName: 'nicole',
    email: 'nicole@gmail.com',
    password: 'password',
    imageUrl: 'https://randomuser.me/api/portraits/women/51.jpg',
  });
};

const createEvents = async () => {
  const user1 = await User.create({
    firstName: 'jesstern',
    email: 'jesstern@gmail.com',
    password: 'password',
    imageUrl: 'https://randomuser.me/api/portraits/women/51.jpg',
  });
  const user2 = await User.create({
    firstName: 'angeline',
    email: 'angeline@gmail.com',
    password: 'password',
    imageUrl: 'https://randomuser.me/api/portraits/women/51.jpg',
  });
  const event1 = await Event.create(
    {
      name: 'Event 1 name',
      slug: 'event-1-name',
      description:
        'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
      eventStart: 'Thu Mar 28 2019 22:03:42 GMT+0800 (Singapore Standard Time)',
      eventEnd: 'Thu Mar 28 2019 22:03:42 GMT+0800 (Singapore Standard Time)',
      organizerId: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    },
    { include: [{ association: User.Organizer, as: 'organizer' }] }
  );

  await event1.setAttendees([user1.id, user2.id]);
  // const foundEvent = await Event.findOne({ where: { name: 'Event 1 name' }, include: [{ all: true }] });
};

module.exports = { createUsers, createEvents };
