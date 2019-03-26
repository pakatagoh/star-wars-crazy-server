const { User } = require('./models');

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
};

module.exports = createUsers;
