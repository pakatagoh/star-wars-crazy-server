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
    { timestamps: true }
  );

  User.associate = models => {
    User.hasOne(models.Score);
    User.hasOne(models.Attendee);
  };

  return User;
};
