const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Score } = require('../models');

const router = express.Router();

const secret = 'the-secret-key';

router.route('/').post(async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { score } = req.body;
    const user = await jwt.verify(token, secret);
    const foundUser = await User.findOne({ where: { id: user.id } });

    if (!foundUser) {
      return res.status(400).json({ error: { message: 'No such user exists' } });
    }

    const existingScore = await foundUser.getScore();

    if (!existingScore) {
      const createdScore = await Score.create({ value: score, userId: foundUser.id });
      return res.status(202).json({ score: createdScore.value });
    }

    if (existingScore.value >= score) {
      return res.status(202).json({ score: existingScore });
    }

    const foundScore = await Score.findOne({ where: { userId: foundUser.id } });
    const updatedScore = await foundScore.update({ value: score });

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
