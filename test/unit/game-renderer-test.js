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
});

describe('gameRenderer render (unit)', () => {
  it('should create a new game', () => {
    return gameRenderer.render(req, res)
      .then(() => {
        assert(newGameGenerator.generate.called);

      });

  });

  it('should extract the view data from the game', () => {
    const game = {
      unusedLetters: ['z', 'y', 'x'],
    };

    newGameGenerator.generate.resolves(game);

    return gameRenderer.render(req, res)
      .then(() => {
        assert(viewDataExtractor.extract.calledWith(game));

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
