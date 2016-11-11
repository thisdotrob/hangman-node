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

  describe('when the random answer generator rejects', () => {
    it('should reject with the error', () => {
      const expectedErr = new Error('unable to get answer');

      randomAnswerGenerator.generate.rejects(expectedErr);

      return newGameGenerator.generate()
        .catch(err => assert.equal(err, expectedErr));

    });
  });

});
