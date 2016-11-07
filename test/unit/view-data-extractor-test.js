'use strict';

const assert = require('assert');

const viewDataExtractor = require('../../lib/view-data-extractor');

describe('viewDataExtractor extract (unit)', () => {
  it('should extract the unused letters from the game', () => {
    const game = {
      unusedLetters: ['a', 'j', 't', 'e'],
      otherProperty: { value: 'xyz' },
    };

    const expectedViewData = {
      unusedLetters: game.unusedLetters,
    };

    const viewData = viewDataExtractor.extract(game);

    assert.deepStrictEqual(viewData, expectedViewData);

  });

});
