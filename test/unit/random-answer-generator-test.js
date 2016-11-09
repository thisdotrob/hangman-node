'use strict';

const assert = require('assert');
const nock = require('nock');
const constants = require('../../constants');

const randomAnswerGenerator = require('../../lib/random-answer-generator');

describe('randomAnswerGenerator generate (unit)', () => {
  it('should get the answer from Wordnik and return it as an array of letters', () => {
    const testAnswer = 'floccinaucinihilipilification';

    nock(constants.WORDNIK_BASE_URL)
      .get(constants.WORDNIK_PATH)
      .query(constants.WORDNIK_QUERY)
      .reply(200, { id: 1, word: testAnswer });

    return randomAnswerGenerator.generate()
      .then(generatedAnswer => assert.deepStrictEqual(generatedAnswer, testAnswer.split('')));
  });

  it('should lower case the answer', () => {
    const testAnswer = 'Genuine';

    nock(constants.WORDNIK_BASE_URL)
      .get(constants.WORDNIK_PATH)
      .query(constants.WORDNIK_QUERY)
      .reply(200, { id: 1, word: testAnswer });

    const expected = testAnswer.toLowerCase().split('');

    return randomAnswerGenerator.generate()
      .then(generatedAnswer => assert.deepStrictEqual(generatedAnswer, expected));
  });

});
