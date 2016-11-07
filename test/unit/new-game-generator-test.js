'use strict';

const assert = require('assert');
const constants = require('../../constants');

const newGameGenerator = require('../../lib/new-game-generator');

describe('newGameGenerator generate (unit)', () => {
  it('should generate a new game with a full array of unused letters', () => {
    const game = newGameGenerator.generate();

    assert.deepStrictEqual(game.unusedLetters, constants.FULL_ALPHABET);

  });

});
