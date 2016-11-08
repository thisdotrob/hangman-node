'use strict';

const sinon = require('sinon');
const assert = require('assert');

const gameUpdater = require('../../lib/game-updater');

describe('gameUpdater update (unit)', () => {
  it('should remove the letter from the game\'s unused letters', () => {
    const unusedLetters = ['a', 'b', 'c'];

    const game = {
      unusedLetters,
      turnsLeft: 6,
      answer: ['d', 'o', 'g'],
      incorrectlyGuessedLetters: ['z', 'x', 'y'],
      correctlyGuessedLetters: ['d', 'o'],
    };

    const req = { body: { letter: 'c' }, session: { game } };

    const res = { redirect: sinon.stub() };

    const expectedUnusedLetters = game.unusedLetters.filter(letter => letter !== req.body.letter);

    gameUpdater.update(req, res);

    assert.deepStrictEqual(req.session.game.unusedLetters, expectedUnusedLetters);

  });

  it('should deduct a turn if the letter is not in the answer', () => {
    const turnsLeft = 6;

    const game = {
      unusedLetters: ['a', 'b', 'c'],
      turnsLeft,
      answer: ['d', 'o', 'g'],
      incorrectlyGuessedLetters: ['z', 'x', 'y'],
      correctlyGuessedLetters: ['d', 'o'],
    };

    const req = { body: { letter: 'c' }, session: { game } };

    const res = { redirect: sinon.stub() };

    gameUpdater.update(req, res);

    const expectedTurnsLeft = turnsLeft - 1;

    assert.deepStrictEqual(req.session.game.turnsLeft, expectedTurnsLeft);

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
