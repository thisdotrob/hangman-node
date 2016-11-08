'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const sinonAsPromised = require('sinon-as-promised');
const constants = require('../../constants');

const randomAnswerGenerator = {};

const newGameGenerator = proxyquire('../../lib/new-game-generator', {
  './random-answer-generator': randomAnswerGenerator,
});

beforeEach(() => randomAnswerGenerator.generate = sinon.stub().resolves([]));

describe('newGameGenerator generate (unit)', () => {
  it('should generate a new game with a full array of unused letters', () => {
    return newGameGenerator.generate()
      .then(newGame => {
        assert.deepStrictEqual(newGame.unusedLetters, constants.FULL_ALPHABET);

      });

  });

  it('should get a random answer from the answer generator', () => {
    const answer = ['c', 'a', 'r'];
    randomAnswerGenerator.generate.resolves(answer);

    return newGameGenerator.generate()
      .then(newGame => {
        assert(randomAnswerGenerator.generate.called);
        assert.deepStrictEqual(newGame.answer, answer);
      });

  });

  it('should set the number of turns left to the starting number', () => {
    return newGameGenerator.generate()
      .then(newGame => {
        assert.deepStrictEqual(newGame.turnsLeft, constants.NUMBER_OF_TURNS);
      });
  });

  it('should set the incorrectly guessed letters to an empty array', () => {
    return newGameGenerator.generate()
      .then(newGame => {
        assert(newGame.incorrectlyGuessedLetters.length === 0);
      })
  });

  it('should set the correctly guessed letters to an empty array', () => {
    return newGameGenerator.generate()
      .then(newGame => {
        assert(newGame.correctlyGuessedLetters.length === 0);
      })
  });

});
