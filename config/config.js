module.exports = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'star-wars-api-dev',
    options: {
      logging: false,
      dialect: 'postgres',
    },
  },
  test: {
    username: 'postgres',
    password: '',
    database: 'star-wars-api-test',
    options: {
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    options: {
      dialect: 'postgres',
    },
  },
};
