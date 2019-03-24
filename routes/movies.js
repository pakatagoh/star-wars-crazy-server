const express = require('express');
const { tmdbApiGetMovie } = require('../services/tmdb');
const router = express.Router();

module.exports = router;

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const foundMovie = await tmdbApiGetMovie(id);
    if (foundMovie) {
      return res.status(200).json(foundMovie);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'something went wrong' });
  }
});
