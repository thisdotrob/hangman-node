'use strict'

exports.config = {
  capabilities: [
    {
      browserName: 'phantomjs',
    },
  ],
  services: [
    'phantomjs',
  ],
  specs: [
    './test/e2e.js',
  ],
  exclude: [],
  maxInstances: 1,
  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [
    'spec',
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000,
  },
};
