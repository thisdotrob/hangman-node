'use strict';

const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const newGameGenerator = {};
const req = {};
const res = {};

const gameStarter = proxyquire('../../lib/game-starter', {
  './new-game-generator': newGameGenerator,
});

beforeEach(() => {
  newGameGenerator.generate = sinon.stub().resolves({});
  req.session = {};
  res.redirect = sinon.stub();
});

describe('gameStarter start (unit)', () => {
  it('should create a new game', () => {
    return gameStarter.start(req, res)
      .then(() => assert(newGameGenerator.generate.called));

  });

  it('should store the newly created game in the session', () => {
    const game = {
      unusedLetters: ['a', 'b', 'c'],
      answer: ['d', 'o', 'g'],
    };

    newGameGenerator.generate.resolves(game);

    return gameStarter.start(req, res)
      .then(() => assert.equal(req.session.game, game));
  });

  it('should redirect to \'/\'', () => {
    return gameStarter.start(req, res)
      .then(() => assert(res.redirect.calledWith('/')));
  });

  describe('when the new game generator rejects', () => {
    it('should redirect to the \'oops\' page', () => {
      newGameGenerator.generate.rejects(new Error());

      return gameStarter.start(req, res)
        .then(() => assert(res.redirect.calledWith('/oops')));

    });

  });

});
