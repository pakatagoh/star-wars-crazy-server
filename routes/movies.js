const express = require('express');
const { tmdbApiGetMovie } = require('../services/tmdb');
const router = express.Router();

module.exports = router;

router.route('/').get(async (req, res) => {
  try {
    const { imdbId } = req.body;
    const foundMovie = await tmdbApiGetMovie(imdbId);
    if (foundMovie) {
      return res.status(200).json(foundMovie);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'something went wrong' });
  }
});
