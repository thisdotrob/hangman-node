'use strict';

const request = require('superagent-promise')(require('superagent'), Promise);
const constants = require('../constants');

function generate() {
  return getRandomWordFromWordnik()
    .then(getAnswerFromResponseBody);
}

function getRandomWordFromWordnik() {
  const timeout = process.env.requestTimeout || constants.REQUEST_TIMEOUT;

  return request.get(`${constants.WORDNIK_BASE_URL}${constants.WORDNIK_PATH}`)
    .query(constants.WORDNIK_QUERY)
    .timeout(timeout)
    .end()
}

function getAnswerFromResponseBody(response) {
  const answerStr = response.body.word;
  return answerStr.toLowerCase().split('');
}

module.exports = {
  generate,
};
