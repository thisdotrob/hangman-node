'use strict';
const assert = require('assert');
const answerMasker = require('../../lib/answer-masker');

describe('answerMasker getMaskedAnswer (unit)', () => {
  it('should mask all the letters if the correctlyGuessedLetters is empty', () => {
    const answer = ['b', 'a', 't', 't', 'l', 'e']

    const correctlyGuessedLetters = [];

    const maskedAnswer = answerMasker.getMaskedAnswer(answer, correctlyGuessedLetters);

    const expectedMaskedAnswer = answer.map(() => '_').join(' ');

    assert.deepStrictEqual(maskedAnswer, expectedMaskedAnswer);

  });
});
