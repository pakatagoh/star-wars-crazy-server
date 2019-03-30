const bcrypt = require('bcrypt');

module.exports = (sequelize, SEQUELIZE) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: SEQUELIZE.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: SEQUELIZE.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter first name',
          },
        },
      },
      lastName: { type: SEQUELIZE.STRING, allowNull: true },
      email: {
        type: SEQUELIZE.STRING,
        unique: {
          args: true,
          msg: 'This email is already taken',
        },
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: SEQUELIZE.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter password',
          },
        },
      },
      imageUrl: {
        type: SEQUELIZE.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Must provide a valid Url',
          },
          isUrl: {
            msg: 'Please provide a valid Url',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync(8);
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    },
    { timestamps: true }
  );

  User.associate = models => {
    User.hasOne(models.Score);
    User.Organizer = User.hasOne(models.Event, { foreignKey: 'organizerId', sourceKey: 'id' });
    User.Attendees = User.belongsToMany(models.Event, {
      as: 'events',
      through: 'event_attendee',
      foreignKey: 'userId',
    });
  };

  return User;
};
