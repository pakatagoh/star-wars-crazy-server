const express = require('express');
const isAuthenticatedMiddleware = require('../middleware/isAuthenticated');
const { User, Score } = require('../models');

const router = express.Router();

router.route('/').get(async (req, res, next) => {
  try {
    const foundScores = await Score.findAll({
      limit: 5,
      order: [['value', 'DESC'], [User, 'firstName', 'ASC']],
      include: [User],
    });

    const finalUsers = foundScores.map(score => {
      return {
        score: score.value,
        firstName: score.user.firstName,
        lastName: score.user.lastName,
        email: score.user.email,
        imageUrl: score.user.imageUrl,
      };
    });

    return res.status(200).json(finalUsers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Protected Routes below this middleware
router.use(isAuthenticatedMiddleware);

router.route('/').post(async (req, res, next) => {
  try {
    const { score } = req.body;
    const foundUser = req.user;

    const existingScore = await foundUser.getScore();

    if (!existingScore) {
      const createdScore = await Score.create({ value: score, userId: foundUser.id });
      return res.status(202).json({ score: createdScore.value });
    }

    if (existingScore.value >= score) {
      return res.status(202).json({ score: existingScore.value });
    }

    const foundScore = await Score.findOne({ where: { userId: foundUser.id } });
    const updatedScore = await foundScore.update({ value: score });
    console.log('THE UPDATED SCORE: ', updatedScore);
    return res.status(202).json({ score });
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: { name: 'SequelizeValidationError', errors: error.errors } });
    }
    return next(error);
  }
});

module.exports = router;
