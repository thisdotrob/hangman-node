'use strict';

const assert = require('assert');
const server = require('../server');
const asciiHangmen = require('./ascii-hangmen');

const ANSWER = 'concurred';
const API_KEY = process.env.WORDNIK_API_KEY;

before(() => {
  server.start();
  browser.pause(250)
  browser.url('http://localhost:8080/');
});

after(() => server.stop());

describe('starting a new game (e2e)', () => {
  it('should display the hangman platform', () => {
    const hangmanState = browser.getText('#hangman-drawing');
    assert.strictEqual(hangmanState, asciiHangmen.startState);
  });

});
