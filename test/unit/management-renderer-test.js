'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const sinonAsPromised = require('sinon-as-promised');

const db = {};
const viewDataExtractor = {};
const req = {};
const res = {};

const managementRenderer = proxyquire('../../lib/management-renderer', {
  '../db': db,
  './view-data-extractor': viewDataExtractor,
});

beforeEach(() => {
  db.getAllSessions = sinon.stub().resolves([]);
  viewDataExtractor.extractManagementViewData = sinon.stub();
  res.render = sinon.stub();
})

describe('managementRenderer render (unit)', () => {
  it('should retrieve all sessions', () => {
    return managementRenderer.render(req, res)
      .then(() => {
        assert(db.getAllSessions.called);

      });
  });

  it('should extract the games view data from the sessions', () => {
    const gameOne = {
      unusedLetters: ['a', 'j', 't', 'e'],
      turnsLeft: 2,
    };

    const gameTwo = {
      unusedLetters: ['z', 'd', 'p', 'q'],
      turnsLeft: 6,
    };

    const managementSession = { property: 'val' };

    const sessions = [managementSession, { game: gameOne }, { game: gameTwo }];

    db.getAllSessions.resolves(sessions);

    return managementRenderer.render(req, res)
      .then(() => {
        assert(viewDataExtractor.extractManagementViewData.calledWith([gameOne, gameTwo]));

      });
  });

  it('should render the \'manage\' template with the view data', () => {
    const gameOne = {
      unusedLetters: ['a', 'j', 't', 'e'],
      turnsLeft: 2,
    };

    const gameTwo = {
      unusedLetters: ['z', 'd', 'p', 'q'],
      turnsLeft: 6,
    };

    const sessions = [{ game: gameOne }, { game: gameTwo }];

    db.getAllSessions.resolves(sessions);

    const gameOneViewData = { answer: ['c', 'u', 'p'] };
    const gameTwoViewData = { answer: ['b', 'o', 'w', 'l'] };

    viewDataExtractor
      .extractManagementViewData
      .withArgs([gameOne, gameTwo])
      .returns({ games: [gameOneViewData, gameTwoViewData] });

    const expectedViewData = {
      games: [gameOneViewData, gameTwoViewData],
    };

    return managementRenderer.render(req, res)
      .then(() => {
        assert(res.render.calledWith('manage', expectedViewData));
      })
  });

});
