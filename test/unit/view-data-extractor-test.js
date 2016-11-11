'use strict';

const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const constants = require('../../constants');

const answerMasker = {};
const resultCalculator = {};

const viewDataExtractor = proxyquire('../../lib/view-data-extractor', {
  './answer-masker': answerMasker,
  './result-calculator': resultCalculator,
});

beforeEach(() => {
  answerMasker.getMaskedAnswer = sinon.stub();
  resultCalculator.getResult = sinon.stub();
});

describe('viewDataExtractor extract (unit)', () => {
  it('should extract the unused letters from the game', () => {
    const game = {
      unusedLetters: ['a', 'j', 't', 'e'],
      otherProperty: { value: 'xyz' },
    };

    const viewData = viewDataExtractor.extract(game);

    assert.deepStrictEqual(viewData.unusedLetters, game.unusedLetters);

  });

  it('should get the masked answer from the answer masker', () => {
    const game = {
      unusedLetters: ['a', 'j', 't', 'e'],
      answer: ['t', 'r', 'a', 's', 'h'],
      otherProperty: { value: 'xyz' },
    };

    const maskedAnswer = ['t', 'r', '_', '_', '_'];

    answerMasker.getMaskedAnswer.returns(maskedAnswer);

    const viewData = viewDataExtractor.extract(game);

    assert(answerMasker.getMaskedAnswer.calledWith(game.answer, game.unusedLetters));

    assert.equal(viewData.maskedAnswer, maskedAnswer);

  });

  it('should extract the turns left from the game', () => {
    const game = {
      unusedLetters: ['a', 'j', 't', 'e'],
      otherProperty: { value: 'xyz' },
      turnsLeft: 2,
    };

    const viewData = viewDataExtractor.extract(game);

    assert.deepStrictEqual(viewData.turnsLeft, game.turnsLeft);
  });

  it('should get the result from the result calculator', () => {
    const game = {
      unusedLetters: ['a', 'j', 't', 'e'],
      answer: ['t', 'r', 'a', 's', 'h'],
      otherProperty: { value: 'xyz' },
    };

    const result = { value: 'in progress' };

    resultCalculator.getResult.returns(result);

    const viewData = viewDataExtractor.extract(game);

    assert(resultCalculator.getResult.calledWith(game));

    assert.equal(viewData.result, result);

  });

});

describe('viewDataExtractor extractManagementViewData (unit)', () => {
  it('should extract the turns left and answer from the games', () => {
    const answer = ['a', 'b', 'c'];

    const turnsLeft = 5;

    const unusedLetters = constants.FULL_ALPHABET;

    const games = [
      { answer, turnsLeft, unusedLetters },
      { answer, turnsLeft, unusedLetters },
      { answer, turnsLeft, unusedLetters },
    ];

    const viewData = viewDataExtractor.extractManagementViewData(games);

    viewData.games.forEach(gameViewData => {
      assert.equal(gameViewData.answer, answer.join(' '));
      assert.equal(gameViewData.turnsLeft, turnsLeft);
    });

  });

  it('should return the used letters for each game', () => {
    const answer = ['a', 'b', 'c'];

    const turnsLeft = 5;

    const unusedLetters = ['z', 'e', 'n', 't'];

    const games = [
      { answer, turnsLeft, unusedLetters },
      { answer, turnsLeft, unusedLetters },
      { answer, turnsLeft, unusedLetters },
    ];

    const viewData = viewDataExtractor.extractManagementViewData(games);

    const expectedUsedLetters = constants.FULL_ALPHABET.filter(letter => {
      return !unusedLetters.includes(letter);
    })

    viewData.games.forEach(gameViewData => {
      assert.deepStrictEqual(gameViewData.usedLetters, expectedUsedLetters);

    });

  });

  it('should get the result from the result calculator for each game', () => {
    const answer = ['a', 'b', 'c'];

    const turnsLeft = 5;

    const unusedLetters = ['z', 'e', 'n', 't'];

    const games = [
      { answer, turnsLeft, unusedLetters },
      { answer, turnsLeft, unusedLetters },
      { answer, turnsLeft, unusedLetters },
    ];

    const result = { value: 'in progress' };

    resultCalculator.getResult.returns(result);

    const viewData = viewDataExtractor.extractManagementViewData(games);

    games.forEach(game => {
      assert(resultCalculator.getResult.calledWith(game));

    });

    viewData.games.forEach(gameViewData => {
      assert.equal(gameViewData.result, result);

    });

  });

  it('should get the masked answer from the answer masker for each game', () => {
    const answer = ['a', 'b', 'c'];

    const turnsLeft = 5;

    const unusedLetters = ['z', 'e', 'n', 't'];

    const games = [
      { answer, turnsLeft, unusedLetters },
      { answer, turnsLeft, unusedLetters },
      { answer, turnsLeft, unusedLetters },
    ];

    const maskedAnswer = ['t', 'r', '_', '_', '_'];

    answerMasker.getMaskedAnswer.returns(maskedAnswer);

    const viewData = viewDataExtractor.extractManagementViewData(games);

    games.forEach(game => {
      assert(answerMasker.getMaskedAnswer.calledWith(game.answer, game.unusedLetters));

    });

    viewData.games.forEach(gameViewData => {
      assert.equal(gameViewData.maskedAnswer, maskedAnswer);

    });

  });

});
