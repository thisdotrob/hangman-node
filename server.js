'use strict';

const childProcess = require('child_process');

let server;

function start() {
  server = childProcess.fork('./app');
}

function stop() {
  server.kill();
}

module.exports = {
  start,
  stop,
};
