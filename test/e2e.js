'use strict';

const assert = require('assert');
const nock = require('nock');
const server = require('../server');
const asciiHangmen = require('./ascii-hangmen');
const constants = require('../constants');

const TEST_ANSWER = 'concurred';

before(() => {
  nock(constants.WORDNIK_BASE_URL)
    .persist()
    .get(constants.WORDNIK_PATH)
    .query(constants.WORDNIK_QUERY)
    .reply(200, { id: 1, word: TEST_ANSWER });

  server.start();

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

  it('should display the answer, with all characters initially masked', () => {
    const displayedAnswer = browser.getText('#masked-answer');

    const expectedDisplayedAnswer = TEST_ANSWER.split('').map(() => '_').join(' ');

    assert.strictEqual(displayedAnswer, expectedDisplayedAnswer);
  });

});
