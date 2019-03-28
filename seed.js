const { User, Score } = require('./models');

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
  await User.create({
    firstName: 'timothy',
    email: 'timothy@gmail.com',
    password: 'password',
    imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
  });
  await User.create(
    {
      firstName: 'huitian',
      email: 'huitian@gmail.com',
      password: 'password',
      imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      score: { value: 2 },
    },
    { include: [Score] }
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

module.exports = createUsers;
