'use strict';

const db = require('./db');

let server;

const start = (cb) => {
  db.connect(() => {
    console.log('DB connected...');
    const app = require('./app');
    server = app.listen(8080, () => {
      console.log('Listening...');
      if (typeof cb === 'function') cb();
    });
  });

};

const stop = () => {
  server.close(() => console.log('Closed...'));
};

module.exports = { start, stop };
