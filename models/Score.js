module.exports = (sequelize, SEQUELIZE) => {
  const Score = sequelize.define(
    'score',
    {
      id: {
        type: SEQUELIZE.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: SEQUELIZE.INTEGER,
      },
    },
    { timestamps: true }
  );

  Score.associate = models => {
    Score.belongsTo(models.User);
  };

  return Score;
};
