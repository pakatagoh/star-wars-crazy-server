const express = require('express');

const app = express();

const movies = require('./routes/movies');

app.use(express.json());
app.use('/api/v1/movies', movies);

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
  });
});

module.exports = app;
