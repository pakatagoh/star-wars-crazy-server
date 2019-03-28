module.exports = (sequelize, SEQUELIZE) => {
  const Attendee = sequelize.define(
    'attendee',
    {
      id: {
        type: SEQUELIZE.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { timestamps: true }
  );

  Attendee.associate = models => {
    Attendee.belongsTo(models.User);
    Attendee.belongsToMany(models.Event, { through: 'event_attendee' });
  };

  return Attendee;
};
