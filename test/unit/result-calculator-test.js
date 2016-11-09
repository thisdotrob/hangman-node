'use strict';

const assert = require('assert');

const resultCalculator = require('../../lib/result-calculator');
const constants = require('../../constants');

describe('resultCalculator getResult (unit)', () => {
  describe('when there are no turns remaining', () => {
    it('should return a \'lost\' result', () => {
      const game = {
        turnsLeft: 0,
        answer: ['d', 'o', 'g'],
        unusedLetters: constants.FULL_ALPHABET,
      };

      const result = resultCalculator.getResult(game);
      assert(result === 'lost');

    });

  });

  describe('when there are turns remaining', () => {
    it('should return an \'in-progress\' result', () => {
      const expectedResult = 'in-progress';

      for(let i = 6; i > 0; i--) {
        const game = {
          turnsLeft: i,
          answer: ['d', 'o', 'g'],
          unusedLetters: constants.FULL_ALPHABET,
        };
        assert(resultCalculator.getResult(game) === expectedResult);
      }

    });

  });

  describe('when all of the answer\'s letters have been guessed', () => {
    it('should return a \'won\' result', () => {
      const expectedResult = 'won';

      const answer = ['d', 'o', 'g'];

      const unusedLetters = constants.FULL_ALPHABET.filter(letter => {
        return !answer.includes(letter);
      });

      const game = {
        turnsLeft: 1,
        answer,
        unusedLetters,
      };

      assert(resultCalculator.getResult(game) === expectedResult);
    });

  });

});
