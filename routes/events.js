const express = require('express');
const { User, Event } = require('../models');
const isAuthenticatedMiddleware = require('../middleware/isAuthenticated');

const router = express.Router();

router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundEvent = await Event.findOne({
      where: { id },
      include: [
        { model: User, as: 'organizer', attributes: { exclude: ['password'] } },
        {
          model: User,
          as: 'attendees',
          attributes: ['id'],
        },
      ],
    });

    if (!foundEvent) {
      return res.status(404).json({ error: { message: 'Unable to find event' } });
    }

    return res.status(200).json(foundEvent);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.route('/').get(async (req, res, next) => {
  try {
    const foundEvents = await Event.findAll({
      include: [
        { model: User, as: 'organizer', attributes: { exclude: ['password'] } },
        {
          model: User,
          as: 'attendees',
          attributes: ['id'],
        },
      ],
    });

    if (!foundEvents) {
      return res.status(404).json({ error: { message: 'Unable to find events' } });
    }

    return res.status(200).json(foundEvents);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

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

router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundEvent = await Event.findOne({
      where: { id },
      include: [
        { model: User, as: 'organizer', attributes: { exclude: ['password'] } },
        {
          model: User,
          as: 'attendees',
          attributes: ['id'],
        },
      ],
    });
    if (!foundEvent) {
      return res.status(404).json({ error: { message: 'Event does not exist' } });
    }

    const updatedEvent = await foundEvent.update(req.body);

    console.log('THE UPDATED EVENT', updatedEvent);
    res.status(201).json(updatedEvent);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.route('/:id').patch(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const findEvent = async () =>
      Event.findOne({
        where: { id },
        include: [
          { model: User, as: 'organizer', attributes: { exclude: ['password'] } },
          {
            model: User,
            as: 'attendees',
            attributes: ['id'],
          },
        ],
      });

    const foundEvent = await findEvent();

    if (!foundEvent) {
      return res.status(404).json({ error: { message: 'Unable to find event, try again' } });
    }

    const isAttending = foundEvent.attendees.find(attendee => attendee.id === user.id);

    if (!isAttending) {
      await foundEvent.addAttendee(`${user.id}`);
    } else {
      await foundEvent.removeAttendee(`${user.id}`);
    }

    const updatedEvent = await findEvent();
    const updatedUser = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password'] },
      include: [{ model: Event, as: 'events', attributes: ['id'] }],
    });
    const updatedUserEvents = updatedUser.events.map(event => ({
      id: event.id,
    }));
    res.status(201).json({ updatedEvent, updatedUserEvents });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
