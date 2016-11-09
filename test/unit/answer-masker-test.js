'use strict';
const assert = require('assert');
const answerMasker = require('../../lib/answer-masker');
const constants = require('../../constants');

describe('answerMasker getMaskedAnswer (unit)', () => {
  it('should mask all the letters if they are all still unused', () => {
    const answer = ['b', 'a', 't', 't', 'l', 'e'];

    const unusedLetters = constants.FULL_ALPHABET;

    const maskedAnswer = answerMasker.getMaskedAnswer(answer, unusedLetters);

    const expectedMaskedAnswer = answer.map(() => '_').join(' ');

    assert.deepStrictEqual(maskedAnswer, expectedMaskedAnswer);

  });

  it('should reveal any letters that are in the answer and have been used', () => {
    const answer = ['b', 'a', 't', 't', 'l', 'e'];

    const unusedLetters = constants.FULL_ALPHABET.filter(letter => letter !== 't');

    const maskedAnswer = answerMasker.getMaskedAnswer(answer, unusedLetters);

    const expectedMaskedAnswer = ['_', '_', 't', 't', '_', '_'].join(' ');

    assert.deepStrictEqual(maskedAnswer, expectedMaskedAnswer);
  });

});
