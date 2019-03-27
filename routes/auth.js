const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

const isDev = process.env.NODE_ENV !== 'production';
const secret = 'the-secret-key';

router.route('/signup').post(async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(400).json({ error: { message: 'User already exists' } });
    }

    const newUser = await User.create(req.body);
    const token = await jwt.sign({ id: newUser.id }, secret);
    res.cookie('token', token, { httpOnly: true, secure: !isDev });
    return res.status(201).json({
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName ? newUser.lastName : '',
      imageUrl: newUser.imageUrl,
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: { name: 'SequelizeValidationError', errors: error.errors } });
    }
    return next(error);
  }
});

router.route('/logout').post((req, res, next) => {
  res.clearCookie('token', { httpOnly: true, secure: !isDev });
  res.status(200).json({ message: 'all good' });
});

router.route('/login').post(async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ where: { email: req.body.email } });

    if (!existingUser) {
      return res.status(400).json({ error: { message: 'User does not exist, please signup' } });
    }

    const token = await jwt.sign({ id: existingUser.id }, secret);
    res.cookie('token', token, { httpOnly: true, secure: !isDev });
    return res.status(201).json({
      id: existingUser.id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName ? existingUser.lastName : '',
      imageUrl: existingUser.imageUrl,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
