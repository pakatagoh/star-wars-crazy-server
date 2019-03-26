const app = require('./app');
const { sequelize } = require('./models');
const createUsers = require('./seed');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const isDev = process.env.NODE_ENV !== 'production';
const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    createUsers();
  }
  app.listen(PORT, () => {
    if (!isDev) {
      // eslint-disable-next-line no-console
      console.log(`Server is running on Heroku with port number ${PORT}`);
    } else {
      // eslint-disable-next-line no-console
      console.log(`Server is running on http://localhost:${PORT}`);
    }
  });
});
