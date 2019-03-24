const axios = require('axios');

const tmdbMovieFindApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/find',
});

const tmdbMovieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
});

const tmdbMovieCreditsApi = async movieId => {
  const retrievedMovieCredits = await tmdbMovieApi.get(`/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}`);
  return retrievedMovieCredits;
};

const tmdbApiGetMovie = async imdbId => {
  try {
    const movieFindResponse = await tmdbMovieFindApi.get(
      `/${imdbId}?api_key=${process.env.TMDB_API_KEY}&external_source=imdb_id`
    );
    const foundMovie = movieFindResponse.data.movie_results[0];
    if (!foundMovie) return {};
    const { id: movie_id, overview, poster_path, release_date, title, vote_average } = foundMovie;
    const creditsResponse = await tmdbMovieCreditsApi(movie_id);
    const { cast } = creditsResponse.data;
    return {
      id: movie_id,
      overview,
      release_date,
      title,
      vote_average,
      cast: cast.splice(0, 4),
      imageSrc: `https://image.tmdb.org/t/p/w342${poster_path}`,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = { tmdbApiGetMovie };
