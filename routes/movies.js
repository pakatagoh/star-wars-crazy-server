const express = require('express');
const { tmdbApiGetMovie } = require('../services/tmdb');

const router = express.Router();

module.exports = router;

router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundMovie = await tmdbApiGetMovie(id);
    res.status(200).json(foundMovie);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
