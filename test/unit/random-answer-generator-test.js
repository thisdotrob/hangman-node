'use strict';

const assert = require('assert');
const nock = require('nock');
const constants = require('../../constants');

const randomAnswerGenerator = require('../../lib/random-answer-generator');

const TEST_ANSWER = 'floccinaucinihilipilification';

describe('randomAnswerGenerator generate (unit)', () => {
  it('should get the answer from Wordnik and return it as an array of letters', () => {
    nock(constants.WORDNIK_BASE_URL)
      .get(constants.WORDNIK_PATH)
      .query(constants.WORDNIK_QUERY)
      .reply(200, { id: 1, word: TEST_ANSWER });

    return randomAnswerGenerator.generate()
      .then(generatedAnswer => assert.deepStrictEqual(generatedAnswer, TEST_ANSWER.split('')));
  });

});
