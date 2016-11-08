'use strict';

const assert = require('assert');

const resultCalculator = require('../../lib/result-calculator');
const constants = require('../../constants');

describe('resultCalculator getResult (unit)', () => {
  describe('when there are no turns remaining', () => {
    it('should return a \'lost\' result', () => {
      const game = { turnsLeft: 0 }
      const result = resultCalculator.getResult(game);
      assert(result === 'lost');

    });

  });

  describe('when there are turns remaining', () => {
    it('should return an \'in-progress\' result', () => {
      const expectedResult = 'in-progress';

      for(let i = 6; i > 0; i--) {
        const game = { turnsLeft: i };
        assert(resultCalculator.getResult(game) === expectedResult);
      }

    });

  });

});
