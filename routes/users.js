const express = require('express');
const { User, Event } = require('../models');
const isAuthenticatedMiddleware = require('../middleware/isAuthenticated');

const router = express.Router();

// Protected Routes below this middleware
router.use(isAuthenticatedMiddleware);

router.route('/events').get(async (req, res, next) => {
  try {
    const { user } = req;

    const foundUserEvents = await Event.findAll(
      { where: { organizerId: user.id } },
      { include: [{ model: User, as: 'organizer', attributes: { exclude: ['password'] } }] }
    );

    res.status(200).json(foundUserEvents);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
