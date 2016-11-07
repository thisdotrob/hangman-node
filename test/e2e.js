'use strict';

const assert = require('assert');
const server = require('../server');
const asciiHangmen = require('./ascii-hangmen');
const constants = require('../constants');

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

  it('should display the dropdown of unused letters the player can choose from', () => {
    const unusedLetters = browser.getText('select#unused-letters');
    assert.strictEqual(unusedLetters, constants.FULL_ALPHABET.join(''));
  });

});
