'use strict';

const sinon = require('sinon');
const assert = require('assert');

const gameUpdater = require('../../lib/game-updater');

describe('gameUpdater update (unit)', () => {
  it('should remove the letter from the game\'s unused letters', () => {
    const game = {
      unusedLetters: ['a', 'b', 'c'],
      answer: ['d', 'o', 'g'],
      incorrectlyGuessedLetters: ['z', 'x', 'y'],
      correctlyGuessedLetters: ['d', 'o'],
    };

    const req = { body: { letter: 'c' }, session: { game } };

    const res = { redirect: sinon.stub() };

    gameUpdater.update(req, res);

    const expectedUnusedLetters = game.unusedLetters.filter(letter => letter !== req.body.letter);

    assert.deepStrictEqual(req.session.game.unusedLetters, expectedUnusedLetters);

  });

  it('should redirect to the index', () => {
    const game = {
      unusedLetters: ['a', 'b', 'c'],
      answer: ['d', 'o', 'g'],
      incorrectlyGuessedLetters: ['z', 'x', 'y'],
      correctlyGuessedLetters: ['d', 'o'],
    };

    const req = { body: { letter: 'c' }, session: { game } };

    const res = { redirect: sinon.stub() };

    gameUpdater.update(req, res);

    assert(res.redirect.calledWith('/'));
  });

});
