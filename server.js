'use strict';

const app = require('./app');

let server;

const start = () => {
  server = app.listen(8080, () => {
    console.log('Listening...');
  });
};

const stop = () => {
  server.close(() => {
    console.log('Closed...');
  })
};

module.exports = { start, stop };
