const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const isDev = process.env.NODE_ENV !== 'production';

app.listen(PORT, () => {
  if (isDev) {
    // eslint-disable-next-line no-console
    return console.log(`Dev server is listening on port ${PORT}`);
  }
  // eslint-disable-next-line no-console
  return console.log(`Server is listening on port ${PORT}`);
});
