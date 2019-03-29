const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const movies = require('./routes/movies');
const auth = require('./routes/auth');
const scores = require('./routes/scores');
const events = require('./routes/events');
const errorMiddleware = require('./middleware/error');

const isDev = process.env.NODE_ENV !== 'production';

const whitelist = ['https://starwarscrazy.netlify.com', 'https://api-starwarscrazy.herokuapp.com'];

if (isDev) {
  whitelist.push('http://localhost:3000');
}

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan(isDev ? 'dev' : 'tiny'));
app.use(express.json());
app.use(cookieParser());

app.use('/v1/movies', movies);
app.use('/v1/auth', auth);
app.use('/v1/scores', scores);
app.use('/v1/events', events);

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
  });
});

app.use(errorMiddleware);

module.exports = app;
