const express = require('express');
const { User, Event } = require('../models');
const isAuthenticatedMiddleware = require('../middleware/isAuthenticated');

const router = express.Router();

// Protected Routes below this middleware
router.use(isAuthenticatedMiddleware);

router.route('/').post(async (req, res, next) => {
  try {
    const eventDetails = req.body;
    const createdEvent = await Event.create(Object.assign(eventDetails, { organizerId: req.user.id }), {
      include: [{ association: User.Organizer, as: 'organizer' }],
    });
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
