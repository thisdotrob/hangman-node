'use strict';

const assert = require('assert');
const sinon = require('sinon');
const sinonAsPromised = require('sinon-as-promised');
const proxyquire = require('proxyquire');

const newGameGenerator = {};
const viewDataExtractor = {};
const req = {};
const res = {};

const gameRenderer = proxyquire('../../lib/game-renderer', {
  './new-game-generator': newGameGenerator,
  './view-data-extractor': viewDataExtractor,
});

beforeEach(() => {
  newGameGenerator.generate = sinon.stub().resolves({});
  viewDataExtractor.extract = sinon.stub().returns({});
  res.render = sinon.stub();
  req.session = {};
});

describe('gameRenderer render (unit)', () => {
  describe('when there is not an existing game in the session', () => {
    it('should create a new game', () => {
      return gameRenderer.render(req, res)
        .then(() => {
          assert(newGameGenerator.generate.called);

        });

    });

    it('should store the newly created game in the session', () => {
      const game = {
        unusedLetters: ['a', 'b', 'c'],
        answer: ['d', 'o', 'g'],
        incorrectlyGuessedLetters: ['z', 'x', 'y'],
        correctlyGuessedLetters: ['d', 'o'],
      };

      newGameGenerator.generate.resolves(game);

      return gameRenderer.render(req, res)
        .then(() => {
          assert.equal(req.session.game, game);
        });
    });

    it('should extract the view data from the newly created game', () => {
      const game = {
        unusedLetters: ['a', 'b', 'c'],
        answer: ['d', 'o', 'g'],
        incorrectlyGuessedLetters: ['z', 'x', 'y'],
        correctlyGuessedLetters: ['d', 'o'],
      };

      newGameGenerator.generate.resolves(game);

      return gameRenderer.render(req, res)
        .then(() => {
          assert(viewDataExtractor.extract.calledWith(game));

        });

    });

  });

  describe('when there is an existing game in the session', () => {
    it('should not create a new game', () => {
      const req = {
        session: {
          game: {
            unusedLetters: ['a', 't', 'o'],
            answer: ['t', 'r', 'a', 'i', 'n'],
            incorrectlyGuessedLetters: ['z', 'x', 'y', 'm'],
            correctlyGuessedLetters: ['r', 'i', 'n'],
          },
        },
      };

      return gameRenderer.render(req, res)
        .then(() => {
          assert(!newGameGenerator.generate.called);

        });
    });

    it('should extract the view data from the game in the session', () => {
      const existingGame = {
        unusedLetters: ['a', 't', 'o'],
        answer: ['t', 'r', 'a', 'i', 'n'],
        incorrectlyGuessedLetters: ['z', 'x', 'y', 'm'],
        correctlyGuessedLetters: ['r', 'i', 'n'],
      };

      const req = { session: { game: existingGame } };

      const newGame = {
        unusedLetters: [],
        answer: ['b', 'u', 'i', 'l', 'd', 'i', 'n', 'g'],
        incorrectlyGuessedLetters: [],
        correctlyGuessedLetters: [],
      };

      newGameGenerator.generate.resolves(newGame);

      return gameRenderer.render(req, res)
        .then(() => {
          assert(viewDataExtractor.extract.calledWith(existingGame));

        });

    });

  });

  it('should render the \'index\' template with the viewData', () => {
    const viewData = {
      unusedLetters: ['l', 'm', 'n'],
    };

    viewDataExtractor.extract.returns(viewData);

    return gameRenderer.render(req, res)
      .then(() => {
        assert(res.render.calledWith('index', viewData));

      });

  });

});
