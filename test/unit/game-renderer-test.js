'use strict';

const assert = require('assert');
const sinon = require('sinon');
const sinonAsPromised = require('sinon-as-promised');
const proxyquire = require('proxyquire');

const viewDataExtractor = {};
const req = {};
const res = {};

const gameRenderer = proxyquire('../../lib/game-renderer', {
  './view-data-extractor': viewDataExtractor,
});

beforeEach(() => {
  viewDataExtractor.extract = sinon.stub().returns({});
  res.render = sinon.stub();
  res.redirect = sinon.stub();
  req.session = {};
});

describe('gameRenderer render (unit)', () => {
  describe('when there is not an existing game in the session', () => {
    it('should redirect to \'start-new-game\'', () => {
      gameRenderer.render(req, res);
      assert(res.redirect.calledWith('/start-new-game'));
    });

  });

  describe('when there is an existing game in the session', () => {
    it('should extract the view data from the game in the session', () => {
      const existingGame = {
        unusedLetters: ['a', 't', 'o'],
        answer: ['t', 'r', 'a', 'i', 'n'],
      };

      const req = { session: { game: existingGame } };

      gameRenderer.render(req, res);
      assert(viewDataExtractor.extract.calledWith(existingGame));

    });

    it('should render the \'index\' template with the viewData', () => {
      const viewData = {
        unusedLetters: ['l', 'm', 'n'],
      };

      viewDataExtractor.extract.returns(viewData);

      gameRenderer.render(req, res)
      assert(res.render.calledWith('index', viewData));

    });

  });



});
