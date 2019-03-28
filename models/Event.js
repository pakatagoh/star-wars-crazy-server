module.exports = (sequelize, SEQUELIZE) => {
  const Event = sequelize.define(
    'event',
    {
      id: {
        type: SEQUELIZE.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Please enter name of event',
          },
        },
      },
      slug: {
        type: SEQUELIZE.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Slug must be specified',
          },
        },
      },
      description: {
        type: SEQUELIZE.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter event description',
          },
        },
      },
      eventStart: {
        type: SEQUELIZE.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter when the event starts',
          },
        },
      },
      eventEnd: {
        type: SEQUELIZE.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter when the event ends',
          },
        },
      },
      imageUrl: {
        type: SEQUELIZE.STRING,
        allowNull: true,
        validate: {
          isUrl: {
            msg: 'Please provide a valid Url',
          },
        },
      },
      capacity: {
        type: SEQUELIZE.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter the maximum capacity for the event',
          },
        },
      },
    },
    { timestamps: true }
  );

  Event.associate = models => {
    Event.belongsTo(models.User, { as: 'organizer', foreignKey: 'organizerId' });
    Event.belongsToMany(models.User, {
      as: 'attendees',
      through: 'event_attendee',
      foreignKey: 'eventId',
    });
  };

  return Event;
};
