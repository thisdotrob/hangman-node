'use strict';

const assert = require('assert');
const nock = require('nock');
const server = require('../server');
const asciiHangmen = require('./ascii-hangmen');
const constants = require('../constants');

const TEST_ANSWER = 'concurred';

before(() => {
  nock(constants.WORDNIK_BASE_URL)
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
    assert.strictEqual(hangmanState, asciiHangmen.sixTurnsRemaining);
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

describe('selecting a wrong letter (e2e)', () => {
  it('should remove the letter from the dropdown of unused letters', () => {
    const wrongLetter = 'z';

    browser.selectByVisibleText('#unused-letters', wrongLetter);
    browser.click('#select-letter-button');

    const unusedLetters = browser.getText('select#unused-letters');

    const expectedUnusedLetters = constants.FULL_ALPHABET.join('').replace(wrongLetter, '');

    assert.strictEqual(unusedLetters, expectedUnusedLetters);
  });

  it('should use up a turn', () => {
    let hangmanState = browser.getText('#hangman-drawing');
    assert.strictEqual(hangmanState, asciiHangmen.fiveTurnsRemaining);

    browser.selectByVisibleText('#unused-letters', 'y');
    browser.click('#select-letter-button');
    hangmanState = browser.getText('#hangman-drawing');
    assert.strictEqual(hangmanState, asciiHangmen.fourTurnsRemaining);

    browser.selectByVisibleText('#unused-letters', 'x');
    browser.click('#select-letter-button');
    hangmanState = browser.getText('#hangman-drawing');
    assert.strictEqual(hangmanState, asciiHangmen.threeTurnsRemaining);

    browser.selectByVisibleText('#unused-letters', 'w');
    browser.click('#select-letter-button');
    hangmanState = browser.getText('#hangman-drawing');
    assert.strictEqual(hangmanState, asciiHangmen.twoTurnsRemaining);

    browser.selectByVisibleText('#unused-letters', 'v');
    browser.click('#select-letter-button');
    hangmanState = browser.getText('#hangman-drawing');
    assert.strictEqual(hangmanState, asciiHangmen.oneTurnRemaining);

    browser.selectByVisibleText('#unused-letters', 't');
    browser.click('#select-letter-button');
    hangmanState = browser.getText('#hangman-drawing');
    assert.strictEqual(hangmanState, asciiHangmen.zeroTurnsRemaining);

  });

});

describe('losing the game (e2e)', () => {
  it('should display the commiserations message', () => {
    const displayedAnswer = browser.getText('#result-message');
    assert.strictEqual(displayedAnswer, 'Oh dear, you lost!');
  });

  it('should not display the \'pick letter\' drop down and submit button', () => {
    assert(!browser.isExisting('#select-letter-form'));
  });

  it('should display the start new game button', () => {
    assert(browser.isExisting('#start-new-game-link'));
  });

});

describe('playing again (e2e)', () => {
  it('should display a new answer', () => {
    const NEW_TEST_ANSWER = 'cat';

    nock(constants.WORDNIK_BASE_URL)
      .get(constants.WORDNIK_PATH)
      .query(constants.WORDNIK_QUERY)
      .reply(200, { id: 1, word: NEW_TEST_ANSWER });

    browser.click('#start-new-game-link');

    const displayedAnswer = browser.getText('#masked-answer');
    const expectedDisplayedAnswer = NEW_TEST_ANSWER.split('').map(() => '_').join(' ');
    assert.strictEqual(displayedAnswer, expectedDisplayedAnswer);
  });

  it('should reset the hangman display', () => {
    const hangmanState = browser.getText('#hangman-drawing');
    assert.strictEqual(hangmanState, asciiHangmen.sixTurnsRemaining);
  });

  it('should reset the unused letters drop down', () => {
    const unusedLetters = browser.getText('select#unused-letters');
    assert.strictEqual(unusedLetters, constants.FULL_ALPHABET.join(''));
  });

});
