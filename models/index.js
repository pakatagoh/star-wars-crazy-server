const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

let sequelize;
// Connect to different database depending on env
if (env === 'production') {
  sequelize = new Sequelize(config.url, config.options);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config.options);
}

const models = {
  User: sequelize.import('./User.js'),
  Score: sequelize.import('./Score.js'),
  Event: sequelize.import('./Event.js'),
  Attendee: sequelize.import('./Attendee.js'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
};
