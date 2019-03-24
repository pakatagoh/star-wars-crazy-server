const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const movies = require('./routes/movies');

const isDev = process.env.NODE_ENV !== 'production';

const whitelist = ['https://api-starwarscrazy.herokuapp.com'];

isDev && whitelist.push('http://localhost:3000');

const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
1;
app.use(morgan(isDev ? 'dev' : 'tiny'));
app.use(express.json());
app.use('/v1/movies', movies);

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
  });
});

module.exports = app;
