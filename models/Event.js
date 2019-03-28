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
    Event.belongsTo(models.User);
    Event.belongsToMany(models.Attendee, { through: 'event_attendee' });
  };

  return Event;
};
