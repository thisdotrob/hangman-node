'use strict';

const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const answerMasker = {};

const viewDataExtractor = proxyquire('../../lib/view-data-extractor', {
  './answer-masker': answerMasker,
});

beforeEach(() => answerMasker.getMaskedAnswer = sinon.stub());

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
      incorrectlyGuessedLetters: ['x', 'y'],
      correctlyGuessedLetters: ['t', 'r'],
      otherProperty: { value: 'xyz' },
    };

    const maskedAnswer = ['t', 'r', '_', '_', '_'];

    answerMasker.getMaskedAnswer.returns(maskedAnswer);

    const viewData = viewDataExtractor.extract(game);

    assert(answerMasker.getMaskedAnswer.calledWith(game.answer, game.correctlyGuessedLetters));

    assert.equal(viewData.maskedAnswer, maskedAnswer);

  });

});
